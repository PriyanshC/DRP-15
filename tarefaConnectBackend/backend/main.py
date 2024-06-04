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
#     "http://localhost:8000"
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
    print("hiii")
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already in use.")
    return crud.create_user(db, user)


@app.post("/api/login", response_model=schemas.User)
def login_user(user_details: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.check_user_details(db, user_details)
    if db_user is None:
        raise HTTPException(status_code=401, detail="Incorrect email or password.")
    return db_user


@app.get("/api/{user_id}/tasks", response_model=list[schemas.Task])
def get_user_tasks(user_id: int, limit: int | None = None, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.get_user_tasks(db, user_id, limit)


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


app.mount("/", SPAStaticFiles(directory="./tarefaConnectFrontend/app/build", html=True), name="frontend")
