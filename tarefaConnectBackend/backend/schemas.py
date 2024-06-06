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
    category: Category | None
    min_rating: int | None
    max_distance: int | None


class Sort(str, Enum):
    rating = 'rating'
    distance = 'distance'


class TaskBase(BaseModel):
    title: str
    description: str


class TaskCreate(TaskBase):
    pass


class Task(TaskBase):
    id: int
    owner_id: int

    # replies: list["Tasker"]

    class Config:
        orm_mode = True


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

    tasks: list[Task]

    class Config:
        orm_mode = True


class ListingBase(BaseModel):
    category: "Category"
    description: str

    tasker_id: int


class ListingCreate(ListingBase):
    pass


class Listing(ListingBase):
    id: int

    class Config:
        orm_mode = True


class TaskerBase(BaseModel):
    headline: str


class TaskerCreate(TaskerBase, UserCreate):
    location: str


class Tasker(TaskerBase):
    id: int

    user_id: int
    country: str
    post_code: str

    listings: list[Listing]

    rating: int
    # endorsements: list[User]
    verified: bool

    # task_bids: list[Task]

    class Config:
        orm_mode = True
