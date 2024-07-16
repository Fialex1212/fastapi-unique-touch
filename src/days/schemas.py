from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from datetime import time, timedelta

class SessionBase(BaseModel):
    start_time: time
    duration: timedelta
    is_busy: bool

class Session(SessionBase):
    id: str

    class Config:
        orm_mode = True

class DayBase(BaseModel):
    day_name: str

class CreateDay(DayBase):
    table_id: str

class UpdateDay(DayBase):
    pass

class Day(DayBase):
    id: str
    sessions: List[Session] = []

    class Config:
        arbitrary_types_allowed = True
