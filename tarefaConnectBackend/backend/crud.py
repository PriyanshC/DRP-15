from datetime import datetime

from sqlalchemy.orm import Session

from . import models, schemas, distance_api, testInfo


def create_user(db: Session, new_user: schemas.UserCreate) -> schemas.User:
    user_args = new_user.dict()
    hashed_password = hash_password(user_args.pop('password'))
    post_code = user_args.pop('post_code').split()[0]
    print(post_code)
    db_user = models.User(**user_args, hashed_password=hashed_password, rating=0, post_code=post_code)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_test_user(db: Session) -> schemas.User:
    test_user_db = create_user(db, new_user=schemas.UserCreate(**testInfo.TEST_USER))

    for task in testInfo.TEST_USER_TASKS:
        create_task(db, schemas.TaskCreate(**task), test_user_db.id)

    return test_user_db


def create_task(db: Session, new_task: schemas.TaskCreate, owner_id: int) -> schemas.Task:
    now = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    db_task = models.Task(**new_task.dict(), post_date_time=now, owner_id=owner_id)

    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


# def create_listing(db: Session, new_listing: schemas.ListingCreate) -> schemas.Listing:
#     db_listing = models.Listing(**new_listing.dict())
#
#     db.add(db_listing)
#     db.commit()
#     db.refresh(db_listing)
#     return db_listing


def create_tasker(db: Session, tasker_details: dict[str, str], user_id: int) -> schemas.Tasker:
    location = tasker_details.pop('location')
    post_code, country = location.split(", ")

    db_tasker = models.Tasker(user_id=user_id,
                              headline=tasker_details['headline'],
                              country=country,
                              post_code=post_code,
                              verified=False)

    db.add(db_tasker)
    db.commit()
    db.refresh(db_tasker)
    return db_tasker


def create_reply(db: Session, reply: schemas.Reply) -> models.Reply:
    db_reply = models.Reply(**reply.dict())
    db.add(db_reply)
    db.commit()
    db.refresh(db_reply)
    return db_reply


def has_replied(db: Session, reply: schemas.Reply) -> bool:
    return (db.query(models.Reply)
            .filter(models.Reply.tasker_id == reply.tasker_id and models.Reply.task_id == reply.task_id)
            .first() is not None)


def get_tasker(db: Session, task_id: int) -> schemas.Tasker:
    return db.query(models.Tasker).filter(models.Tasker.task_id == task_id).first()


def get_task_list(db: Session, post_code: str, filters: schemas.Filters | None,
                  sort: schemas.Sort | None, skip: int, limit: int) -> list[schemas.TaskElemResponse]:
    query = db.query(models.Task).join(models.Task.owner)

    has_dist_filter = False
    has_dist_sort = False

    if filters is not None:
        if filters.category is not None:
            query = query.filter(models.Task.category == filters.category)
        if filters.min_rating is not None:
            query = query.filter(models.User.rating >= filters.min_rating)
        if filters.max_distance is not None:
            has_dist_filter = True

    if sort is not None:
        if sort is schemas.Sort.rating:
            query = query.order_by(models.User.rating.desc())
        else:
            has_dist_sort = True

    if has_dist_filter or has_dist_sort:
        query = query.all()

        if has_dist_filter:
            query = list(filter(
                lambda task: distance_api.distance_between(task.owner.post_code, post_code) <= filters.max_distance
                , query))

        if has_dist_sort:
            query.sort(key=lambda task: distance_api.distance_between(task.owner.post_code, post_code))

        query = query[skip:limit]
    else:
        query = query.offset(skip).limit(limit).all()

    return list(map(lambda task:
                    schemas.TaskElemResponse(title=task.title,
                                             description=task.description,
                                             frequency=task.frequency,
                                             distance=distance_api.distance_between(post_code,
                                                                                    task.owner.post_code),
                                             owner_id=task.owner_id,
                                             rating=task.owner.rating,
                                             post_date_time=task.post_date_time)
                    , query))


def get_user(db: Session, user_id: int) -> schemas.User:
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: schemas.EmailStr) -> schemas.User | None:
    return db.query(models.User).filter(models.User.email == email).first()


def get_user_tasks(db: Session, user_id: int, skip: int | None, limit: int | None) -> list[schemas.Task]:
    return db.query(models.User).filter(models.User.id == user_id).first().tasks[skip:limit]


def get_task(db: Session, task_id: int) -> schemas.Task | None:
    return db.query(models.Task).filter(models.Task.id == task_id).first()


def get_task_replies(db: Session, task_id: int, skip: int, limit: int) -> list[schemas.ReplyResponse]:
    query = db.query(models.Reply).filter(models.Reply.task_id == task_id).offset(skip).limit(limit).all()

    return list(map(lambda reply: schemas.ReplyResponse(tasker_id=reply.tasker_id,
                                                        tasker_forename=reply.tasker.user.forename,
                                                        tasker_surname=reply.Tasker.user.surname,
                                                        message=reply.message,
                                                        rating=reply.tasker.user.rating),
                    query))


def check_user_details(db: Session, user_details: schemas.UserLogin) -> schemas.User | None:
    db_user = get_user_by_email(db, user_details.email)
    if db_user is None or db_user.hashed_password != hash_password(user_details.password):
        return None
    return db_user


def has_test_user(db: Session) -> bool:
    return get_user_by_email(db, testInfo.TEST_USER.get("email")) is not None


def hash_password(password: str) -> str:
    return password
