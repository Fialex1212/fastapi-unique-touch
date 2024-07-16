from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, mapped_column
from ..database import Base
import uuid

class Day(Base):
    __tablename__ = "days"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True, unique=True, nullable=False)
    day_name = Column(String, nullable=False, index=True)
    table_id = Column(String, ForeignKey("tables.id"))
    table = relationship("Table", back_populates="days")
    sessions = relationship("Session", back_populates="day")

    def __repr__(self):
        return f"{self.day_name}, {self.id}"