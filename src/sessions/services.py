from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from .models import Session as DBSession
from .schemas import CreateSession, UpdateSession

def create_session(
    session: CreateSession,
    db: Session
):
    db_session = DBSession(**session.model_dump())
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session

def get_session(
    session_id: str,
    db: Session,
):
    return db.query(DBSession).filter(DBSession.id == session_id).first()

def get_sessions(
        db: Session, 
        skip: int = 0, 
        limit: int = 10):
    return db.query(DBSession).offset(skip).limit(limit).all()

def update_session(
    session_id: str,
    session_update: UpdateSession,
    db: Session
):
    db_session = db.query(DBSession).filter(DBSession.id == session_id).first()
    if db_session:
        if session_update.date is not None:
            db_session.date = session_update.date
        if session_update.time is not None:
            db_session.time = session_update.time
        if session_update.type_service is not None:
            db_session.type_service = session_update.type_service
        if session_update.duration is not None:
            db_session.duration = session_update.duration

        try:
            db.commit()
            db.refresh(db_session)
            return db_session
        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=404, detail="Integrity error occurred")
        
    return db_session

def delete_session(
    session_id: str,
    db: Session
):
    db_session = db.query(DBSession).filter(DBSession.id == session_id).first()
    if db_session:
        db.delete(db_session)
        db.commit()
    return db_session