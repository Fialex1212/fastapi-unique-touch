from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Time, Interval
from sqlalchemy.orm import relationship
from ..database import Base
import uuid

class Session(Base):
    __tablename__ = "sessions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True, unique=True, nullable=False)
    start_time = Column(Time, nullable=False)
    duration = Column(Interval, nullable=False, default="01:30:00")
    is_busy = Column(Boolean, index=True, default=False)
    day_id = Column(String, ForeignKey("days.id"))
    day = relationship("Day", back_populates="sessions")

    def __repr__(self):
        return f"Session(start_time={self.start_time}, duration={self.duration})"