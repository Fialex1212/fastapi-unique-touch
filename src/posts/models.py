from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..database import Base
import uuid

class Post(Base):
    __tablename__ = "posts"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True, unique=True, nullable=False)
    title = Column(String, index=True, nullable=False)
    subtitle = Column(String, index=True, nullable=False)

    def __repr__(self):
        return f"{self.title}, {self.id}"