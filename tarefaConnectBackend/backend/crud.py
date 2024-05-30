from sqlalchemy.orm import Session

from . import models, schemas


def get_all_tasks(db: Session):
    return db.query(models.Task).all()


def get_task(db: Session, task_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id).first()


def create_task(db: Session, new_task: schemas.TaskCreate):
    db_user = models.Task(**new_task.dict())

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
