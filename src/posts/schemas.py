from pydantic import BaseModel
from typing import Optional
from uuid import UUID 

class PostBase(BaseModel):
    title: str
    subtitle: str

    class Config:
        arbitrary_types_allowed = True

class CreatePost(PostBase):
    pass

class UpdatePost(PostBase):
    title: Optional[str] = None
    subtitle: Optional[str] = None

class Post(PostBase):
    id: UUID

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True