from pydantic import BaseModel, EmailStr, constr
from typing import Optional
from uuid import UUID

class UserBase(BaseModel):
    username: constr(max_length=50)
    email: EmailStr

class CreateUser(UserBase):
    password: constr(min_length=8)

class UpdateUser(UserBase):
    username: Optional[constr(max_length=50)] = None
    email: Optional[EmailStr] = None
    password: Optional[constr(min_length=8)] = None

class User(UserBase):
    id: UUID
    
    class Config:
        from_attributes = True