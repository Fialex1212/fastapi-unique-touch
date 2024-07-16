from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from ..days.models import Day

class TableBase(BaseModel):
    name: str
    days: List[Day] = []

    class Config:
        arbitrary_types_allowed = True

class CreateTable(TableBase):
    pass

class UpdateTable(TableBase):
    name: Optional[str] = None
    days: Optional[List[Day]] = []

class Table(TableBase):
    id: UUID

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True