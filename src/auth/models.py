from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..database import Base
import uuid

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True, unique=True, default=lambda: str(uuid.uuid4()), nullable=False)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    # appointments = relationship("Session", back_populates="users");p[]

    def __repr__(self):
        return f"{self.username}, {self.id}"