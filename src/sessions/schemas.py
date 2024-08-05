from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class BaseSession(BaseModel):
    date: str
    time: str
    type_service: str
    duration: str

    class Config:
        arbitrary_types_allowed = True

class CreateSession(BaseSession):
    pass

class UpdateSession(BaseSession):
    user: Optional[str]
    date: Optional[str]
    time: Optional[str]
    type_service: Optional[str]
    duration: Optional[str]

class Session(BaseSession):
    id: UUID

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True