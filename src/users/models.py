from sqlalchemy import Column, String
from ..database import Base
import uuid

class User(Base):
    __tablename__ = "users"

    id = Column(String, nullable=False, index=True, unique=True, default=lambda x: str(uuid.uuid4()), primary_key=True)
    username = Column(String, nullable=True, index=True, unique=True)
    user_email = Column(String, nullable=False, index=True, unique=True)
    role = Column(String, nullable=False, index=True, default="User")

    def __repr__(self):
        return f"{self.id, self.username}"