from sqlalchemy import Column, Float, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import relationship
# from sqlalchemy.ext.hybrid import hybrid_method

from .database import Base

# from . import distance_api


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    forename = Column(String)
    surname = Column(String)
    post_code = Column(String)

    hashed_password = Column(String)
    rating = Column(Float)

    # tasks = relationship("Task", back_populates="owner")

    # @hybrid_method
    # def distance(self, user_post_code: str) -> float:
    #     return distance_api.distance_between(user_post_code, self.post_code)


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    category = Column(String)
    user_heading = Column(String)

    frequency = Column(Float)
    post_date_time = Column(String)

    expected_price = Column(Float)

    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    owner = relationship("User")

    # review = relationship("Review", uselist=False)


# class Listing(Base):
#     __tablename__ = "listings"
#
#     id = Column(Integer, primary_key=True)
#     category = Column(String)
#     description = Column(String)
#
#     tasker_id = Column(Integer, ForeignKey("taskers.id"))
#     tasker = relationship("Tasker", back_populates="listings")


class Rating(Base):
    __tablename__ = "ratings"

    id = Column(Integer, primary_key=True)

    number_ratings = Column(Integer)
    overall_rating = Column(Float)
    punctuality = Column(Float)
    time_taken = Column(Float)
    value_for_money = Column(Float)

    tasker_id = Column(Integer, ForeignKey("taskers.id", ondelete="CASCADE"))

    __table_args__ = (UniqueConstraint("tasker_id"),)


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True)
    comment = Column(String)

    tasker_id = Column(Integer, ForeignKey("taskers.id", ondelete="CASCADE"))
    task_id = Column(Integer, ForeignKey("tasks.id", ondelete="CASCADE"))

    __table_args__ = (UniqueConstraint("task_id"),)


class Expertise(Base):
    __tablename__ = "expertise"
    id = Column(Integer, primary_key=True)

    title = Column(String)
    description = Column(String)

    tasker_id = Column(Integer, ForeignKey("taskers.id", ondelete="CASCADE"))


class Tasker(Base):
    __tablename__ = "taskers"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    user = relationship("User")

    headline = Column(String)

    # verified = Column(Boolean)

    rating = relationship("Rating", uselist=False)
    expertise = relationship("Expertise")
    reviews = relationship("Review")

    __table_args__ = (UniqueConstraint("user_id"),)


class Reply(Base):
    __tablename__ = "replies"

    tasker_id = Column(Integer, ForeignKey("taskers.id", ondelete="CASCADE"), primary_key=True)
    tasker = relationship("Tasker")

    task_id = Column(Integer, ForeignKey("tasks.id", ondelete="CASCADE"), primary_key=True)

    message = Column(String)
