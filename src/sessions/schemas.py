from pydantic import BaseModel
from typing import List, Optional
from datetime import time, timedelta
from uuid import UUID

class SessionBase(BaseModel):
    start_time: time
    duration: timedelta
    is_busy: bool

class SessionCreate(SessionBase):
    day_id: str

class Session(SessionBase):
    id: str

    class Config:
        arbitrary_types_allowed = True
