from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from ..database import Base
import uuid

class Table(Base):
    __tablename__ = "tables"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True, unique=True, nullable=False)
    name = Column(String, index=True, nullable=False)
    days = relationship("Day", back_populates="table")