from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    forename = Column(String)
    surname = Column(String)
    hashed_password = Column(String)

    tasks = relationship("Task", back_populates="owner")


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    category = Column(String)
    user_heading = Column(String)

    frequency = Column(Float)

    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    owner = relationship("User", back_populates="tasks")


class Listing(Base):
    __tablename__ = "listings"

    id = Column(Integer, primary_key=True)
    category = Column(String)
    description = Column(String)

    tasker_id = Column(Integer, ForeignKey("taskers.id"))
    tasker = relationship("Tasker", back_populates="listings")


class Tasker(Base):
    __tablename__ = "taskers"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    user = relationship("User")

    headline = Column(String)

    country = Column(String)
    post_code = Column(String)

    listings = relationship("Listing", back_populates="tasker")

    rating = Column(Integer)
    verified = Column(Boolean)


class Reply(Base):
    __tablename__ = "replies"

    tasker_id = Column(Integer, ForeignKey("taskers.id", ondelete="CASCADE"), primary_key=True)
    tasker = relationship("Tasker")

    task_id = Column(Integer, ForeignKey("tasks.id", ondelete="CASCADE"), primary_key=True)

    message = Column(String)

