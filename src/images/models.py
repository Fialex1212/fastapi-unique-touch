from sqlalchemy import Column, String
from ..database import Base
import uuid

class Image(Base):
    __tablename__ = "images"

    id = Column(String, nullable=False, index=True, unique=True, default=lambda x: str(uuid.uuid4()), primary_key=True)
    filename = Column(String, unique=True, index=True)
    filepath = Column(String, unique=True, index=True)

    def __repr__(self):
        return f"{self.filename}, {self.id}"