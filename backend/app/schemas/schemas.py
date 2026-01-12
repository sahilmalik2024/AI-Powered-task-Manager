from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# 👉 Used for GET responses (has priority)
class TaskBase(BaseModel):
    title: str
    description: str
    deadline: datetime

# 🚫 No 'priority' here — priority will be predicted by AI
class TaskCreate(BaseModel):
    title: str
    description: str
    deadline: datetime

# ✅ Response model — includes predicted priority and other data
class Task(TaskBase):
    id: int
    priority: Optional[int] = None  # 👈 Optional now
    status: bool
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ========== User and Token Schemas ==========

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None


class ShowUser(UserBase):
    id: int

    class Config:
        orm_mode = True