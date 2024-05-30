from sqlalchemy import Column, Integer, String
# from sqlalchemy.orm import relationship

from .database import Base


class Task(Base):
    __tablename__ = "Tasks"

    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    # owner_id = Column(Integer, ForeignKey("users.id"))
    #
    # owner = relationship("User", back_populates="items")
