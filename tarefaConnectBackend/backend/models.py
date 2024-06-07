from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    forename = Column(String)
    surname = Column(String)
    hashed_password = Column(String)

    tasks = relationship("Task", back_populates="owner")


class Task(Base):
    __tablename__ = "tasks"

    task_id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    category = Column(String)
    user_heading = Column(String)
    owner_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))

    owner = relationship("User", back_populates="tasks")


class Listing(Base):
    __tablename__ = "listings"

    listing_id = Column(Integer, primary_key=True)
    category = Column(String)
    description = Column(String)

    listing_tasker_id = Column(Integer, ForeignKey("taskers.tasker_id"))

    tasker = relationship("Tasker", back_populates="listings")


class Tasker(Base):
    __tablename__ = "taskers"

    tasker_id = Column(Integer, primary_key=True)

    tasker_user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
    user = relationship("User")

    headline = Column(String)

    country = Column(String)
    post_code = Column(String)

    listings = relationship("Listing", back_populates="tasker")

    rating = Column(Integer)
    verified = Column(Boolean)


class Reply(Base):
    __tablename__ = "replies"

    reply_tasker_id = Column(Integer, ForeignKey("taskers.tasker_id", ondelete="CASCADE"), primary_key=True)
    reply_task_id = Column(Integer, ForeignKey("tasks.task_id", ondelete="CASCADE"), primary_key=True)
