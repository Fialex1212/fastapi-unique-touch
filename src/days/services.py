from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from .models import Day as DBDay
from .schemas import CreateDay, UpdateDay

def create_day(db: Session, day: CreateDay):
    db_day = DBDay(**day.model_dump())
    db.add(db_day)
    db.commit()
    db.refresh(db_day)
    return db_day

def get_day(db: Session, day_id: str):
    return db.query(DBDay).filter(DBDay.id == day_id).first()

def get_days(db: Session, skip: int = 0, limit: int = 10):
    return db.query(DBDay).offset(skip).limit(limit).all()

def update_day(db: Session, day_id: str, day_update: UpdateDay):
    db_day = db.query(DBDay).filter(DBDay.id == day_id).filter()
    if db_day:
        if day_update.day_name is not None:
            db_day.day_name = day_update.day_name
        if day_update.table_id is not None:
            db_day.table_id = day_update.table_id
        if day_update.sessions is not None:
            db_day.sessions = day_update.sessions

        try:
            db.commit()
            db.refresh(db_day)
            return db_day
        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=400, detail="Integrity error occurred")
        
    return db_day

def delete_day(db: Session, day_id: str):
    db_day = db.query(DBDay).filter(DBDay.id == day_id).first()
    if db_day:
        db.delete(db_day)
        db.commit()
    return db_day