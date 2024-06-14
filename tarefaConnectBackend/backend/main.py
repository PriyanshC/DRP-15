import inspect
from typing import Generator

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from starlette.exceptions import HTTPException as StarletteHTTPException

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# origins = [
#     "http://localhost:8000",
#     "http://localhost:3000"
#
# ]
#
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


class SPAStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope):
        try:
            return await super().get_response(path, scope)
        except (HTTPException, StarletteHTTPException) as ex:
            if ex.status_code == 404:
                return await super().get_response(".", scope)
            else:
                raise ex


# Dependency
def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/api/create-user", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if not crud.has_test_user(db):
        crud.create_test_info(db)

    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user is not None:
        raise HTTPException(status_code=400, detail="Email already in use.")
    return crud.create_user(db, user)


@app.post("/api/create-tasker", response_model=schemas.Tasker)
def create_tasker(tasker: schemas.TaskerCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=tasker.email)
    if db_user is not None:
        raise HTTPException(status_code=400, detail="Email already in use.")

    keys = [key for key in schemas.UserCreate.__fields__.keys()]

    tasker_dict = tasker.dict()
    tasker_dict.update({"expertise": tasker.expertise})

    user_dict = dict()

    for key in keys:
        user_dict.update({key: tasker_dict.pop(key)})

    db_user = crud.create_user(db, schemas.UserCreate(**user_dict))

    tasker_dict.update({"user_id": db_user.id})

    return crud.create_tasker(db, tasker_dict)


@app.post("/api/login", response_model=schemas.User)
def login_user(user_details: schemas.UserLogin, db: Session = Depends(get_db)):
    if not crud.has_test_user(db):
        crud.create_test_info(db)
    db_user = crud.check_user_details(db, user_details)

    if db_user is None:
        raise HTTPException(status_code=401, detail="Incorrect email or password.")
    return db_user


@app.get("/api/{user_id}/tasks", response_model=list[schemas.Task])
def get_user_tasks(user_id: int, skip: int | None = None, limit: int | None = None, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.get_user_tasks(db, user_id, skip, limit)


@app.post("/api/{user_id}/create-task", response_model=schemas.Task)
def create_task(user_id: int, new_task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.create_task(db, new_task, user_id)


@app.get("/api/tasks/{task_id}", response_model=schemas.Task)
def get_task(task_id: int, db: Session = Depends(get_db)):
    db_task = crud.get_task(db, task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task


@app.get("/api/taskers/{tasker_id}", response_model=schemas.Tasker)
def get_tasker(tasker_id: int, db: Session = Depends(get_db)):
    return crud.get_tasker(db, tasker_id)  # TODO


@app.post("/api/taskers/{tasker_id}/review", response_model=schemas.Tasker)
def add_review(tasker_id: int, new_review: schemas.ReviewCreate, db: Session = Depends(get_db)):
    if crud.has_reviewed(db, new_review.task_id):
        raise HTTPException(status_code=400, detail="This task has been reviewed")

    return crud.add_review(db, new_review, tasker_id)


@app.post("/api/tasks", response_model=list[schemas.TaskElemResponse])
def get_task_list(query: schemas.TaskQuery, db: Session = Depends(get_db)):
    return crud.get_task_list(db, query.post_code, schemas.Filters(category=query.filter_category,
                                                                   min_rating=query.filter_min_rating,
                                                                   max_distance=query.filter_max_distance),
                              sort, skip, limit)


# @app.post("/api/taskers/create-listing", response_model=schemas.Listing)
# def create_listing(listing: schemas.ListingCreate, db: Session = Depends(get_db)):
#     print("here")
#     return crud.create_listing(db, listing)  # TODO


# @app.get("/api/listings", response_model=list[schemas.Listing])
# def get_listings(filter_category: schemas.Category | None = None,
#                  filter_min_rating: int | None = None,
#                  filter_max_distance: int | None = None,
#                  sort: schemas.Sort | None = None,
#                  skip: int = 0,
#                  limit: int = 20,
#                  db: Session = Depends(get_db)):
#     raise HTTPException(status_code=404, detail="Listings not found")
# return crud.get_listings(db, schemas.Filters(category=filter_category,
#                                              min_rating=filter_min_rating,
#                                              max_distance=filter_max_distance),
#                          sort, skip, limit)


@app.post("/api/tasks/reply", response_model=schemas.Reply)
def create_reply(reply: schemas.Reply, db: Session = Depends(get_db)):
    if crud.has_replied(db, reply):
        raise HTTPException(status_code=400, detail="You have already replied to this task.")
    return crud.create_reply(db, reply)


@app.get("/api/tasks/{task_id}/replies", response_model=list[schemas.Reply])
def get_task_replies(task_id: int, skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    if crud.get_task(db, task_id) is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return crud.get_task_replies(db, task_id, skip, limit)


app.mount("/", SPAStaticFiles(directory="./tarefaConnectFrontend/app/build", html=True), name="frontend")
