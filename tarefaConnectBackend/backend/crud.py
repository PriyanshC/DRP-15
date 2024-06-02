from sqlalchemy.orm import Session

from . import models, schemas


def create_user(db: Session, new_user: schemas.UserCreate) -> schemas.User:
    hashed_password = hash_password(new_user.password)
    user_args = new_user.dict()
    user_args.pop('password')
    db_user = models.User(**user_args, hashed_password=hashed_password)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user(db: Session, user_id: int) -> schemas.User:
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: schemas.EmailStr) -> schemas.User:
    return db.query(models.User).filter(models.User.email == email).first()


def check_user_details(db: Session, user_details: schemas.UserLogin) -> schemas.User | None:
    db_user = get_user_by_email(db, user_details.email)
    if db_user is None or db_user.hashed_password != hash_password(user_details.password):
        return None
    return db_user


def get_user_tasks(db: Session, user_id: int, limit: int) -> list[schemas.Task]:
    return db.query(models.User).filter(models.User.id == user_id).first().tasks[:limit]


def get_task(db: Session, task_id: int) -> schemas.Task:
    return db.query(models.Task).filter(models.Task.id == task_id).first()


def create_task(db: Session, new_task: schemas.TaskCreate, owner_id: int) -> schemas.Task:
    db_task = models.Task(**new_task.dict(), owner_id=owner_id)

    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def hash_password(password: str) -> str:
    return password
