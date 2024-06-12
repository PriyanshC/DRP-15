from pydantic import BaseModel, EmailStr

from enum import Enum


class Category(str, Enum):
    plumbing = 'plumbing'
    electric = 'electric'
    gardening = 'gardening'
    domestic_cleaning = 'domestic cleaning'
    dog_walking = 'dog walking'
    other = 'other'


class Filters(BaseModel):
    category: Category | None = None
    min_rating: int | None = None
    max_distance: int | None = None


class Sort(str, Enum):
    rating = 'rating'
    distance = 'distance'


class TaskBase(BaseModel):
    title: str
    description: str
    category: Category | None = None
    frequency: float


class TaskCreate(TaskBase):
    user_heading: str | None = None


class Task(TaskBase):
    id: int
    owner_id: int

    user_heading: str | None = None
    post_date_time: str

    class Config:
        orm_mode = True


class TaskElemResponse(TaskBase):
    distance: float
    user_id: int
    rating: float
    post_date_time: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserBase(BaseModel):
    email: EmailStr
    forename: str
    surname: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    hashed_password: str

    rating: int

    tasks: list[Task]

    class Config:
        orm_mode = True


# class ListingBase(BaseModel):
#     category: "Category"
#     description: str
#
#     tasker_id: int
#
#
# class ListingCreate(ListingBase):
#     pass
#
#
# class Listing(ListingBase):
#     id: int
#
#     class Config:
#         orm_mode = True


class TaskerBase(BaseModel):
    headline: str


class TaskerCreate(TaskerBase, UserCreate):
    location: str


class Tasker(TaskerBase):
    id: int

    user_id: int
    country: str
    post_code: str

    # listings: list[Listing]

    # endorsements: list[User]
    # verified: bool

    class Config:
        orm_mode = True


class Reply(BaseModel):
    tasker_id: int
    task_id: int

    message: str | None = None


class ReplyResponse(BaseModel):
    tasker_id: int

    tasker_forename: str
    tasker_surname: str
    message: str | None = None
    rating: int

