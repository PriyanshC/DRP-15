from typing import Generator

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# origins = [
#     'http://localhost:3000'
# ]
#
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )


# Dependency
def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class Task(BaseModel):
    title: str
    description: str


@app.get("/api/create-task", response_model=list[schemas.Task])
def get_all_tasks(db: Session = Depends(get_db)):
    return crud.get_all_tasks(db)


@app.post("/api/create-task", response_model=schemas.Task)
def create_task(new_task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db, new_task)


@app.get("/api/tasks/{task_id}", response_model=schemas.Task)
def get_task(task_id: int, db: Session = Depends(get_db)):
    return crud.get_task(db, task_id)


app.mount("/", StaticFiles(directory="./tarefaConnectFrontend/app/build", html=True), name="frontend")
