from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
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
    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

    owner = relationship("User", back_populates="tasks")


class Listing(Base):
    __tablename__ = "listings"

    id = Column(Integer, primary_key=True)
    category = Column(String)  # TODO: use enum
    description = Column(String)

    tasker_id = Column(Integer, ForeignKey("taskers.id"))

    tasker = relationship("Tasker", back_populates="listings")


class Tasker(Base):
    __tablename__ = "taskers"

    id = Column(Integer, primary_key=True)

    headline = Column(String)

    country = Column(String)
    postal_code = Column(String)

    listings = relationship("Listing", back_populates="tasker")

    rating = Column(Integer)
    verified = Column(Boolean)
