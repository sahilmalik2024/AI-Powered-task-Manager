from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.database.database import Base

class Task(Base):
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    description = Column(String)
    deadline = Column(DateTime)
    status = Column(String)
    completed_at = Column(DateTime, nullable=True)
    priority = Column(Integer)

    user = relationship("User")
