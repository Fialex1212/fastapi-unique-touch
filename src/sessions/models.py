from sqlalchemy import Column, String
from ..database import Base
import uuid

class Session(Base):
    __tablename__ = "sessions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), nullable=False, index=True, unique=True)
    user = Column(String, default="Admin", nullable=False, index=True)
    date = Column(String, nullable=False, index=True)
    time = Column(String, nullable=False, index=True)
    type_service = Column(String, nullable=False)
    duration = Column(String, nullable=False, index=True)

    def __repr__(self):
        return f"{self.id, self.date, self.time, self.type_service, self.user}"