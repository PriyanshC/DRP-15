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
    expected_price: float


class TaskCreate(TaskBase):
    user_heading: str | None = None


class Task(TaskBase):
    id: int
    owner_id: int

    user_heading: str | None = None
    post_date_time: str

    class Config:
        orm_mode = True


class TaskQuery(BaseModel):
    post_code: str
    filter_category: Category | None = None
    filter_min_rating: float | None = None
    filter_max_distance: float | None = None
    sort: Sort | None = None
    skip: int = 0
    limit: int = 20


class TaskElemResponse(TaskBase):
    id: int
    name: str
    distance: float
    owner_id: int
    rating: float
    post_date_time: str
    expected_price: float


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserBase(BaseModel):
    email: EmailStr
    forename: str
    surname: str
    post_code: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    hashed_password: str

    rating: float

    # tasks: list[Task]

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


class ReviewBase(BaseModel):
    comment: str | None = None
    task_id: int


class ReviewCreate(ReviewBase):
    overall_rating: float
    punctuality: float
    time_taken: float
    value_for_money: float


class Review(ReviewBase):
    id: int
    tasker_id: int

    class Config:
        orm_mode = True


class RatingBase(BaseModel):
    tasker_id: int


class RatingCreate(RatingBase):
    pass


class Rating(RatingBase):
    id: int

    number_ratings: int
    overall_rating: float
    punctuality: float
    time_taken: float
    value_for_money: float

    class Config:
        orm_mode = True


class ExpertiseBase(BaseModel):
    title: str
    description: str


class ExpertiseCreate(ExpertiseBase):
    pass


class Expertise(ExpertiseBase):
    id: int

    tasker_id: int

    class Config:
        orm_mode = True


class TaskerBase(BaseModel):
    headline: str


class TaskerCreate(TaskerBase, UserCreate):
    expertise: list[ExpertiseCreate] = []


class Tasker(TaskerBase):
    id: int

    user_id: int
    user: User

    rating: Rating
    expertise: list[Expertise]
    reviews: list[Review]

    # listings: list[Listing]

    # endorsements: list[User]
    # verified: bool

    class Config:
        orm_mode = True


class ReplyBase(BaseModel):
    message: str | None = None

    tasker_id: int
    task_id: int


class ReplyCreate(ReplyBase):
    pass


class Reply(ReplyBase):
    tasker: Tasker

    class Config:
        orm_mode = True


class ReplyResponse(ReplyBase):
    tasker_forename: str
    tasker_surname: str
    rating: Rating

