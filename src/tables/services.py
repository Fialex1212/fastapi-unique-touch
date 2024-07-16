from fastapi import HTTPException
from .dependency import get_db
from .schemas import CreateTable, UpdateTable
from .models import Table as DBTable
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

def create_table(db: Session, table: CreateTable):
    db_table = DBTable(**table.model_dump())
    db.add(db_table)
    db.commit()
    db.refresh(db_table)
    return db_table

def get_table(db: Session, table_id: str):
    return db.query(DBTable).filter(DBTable.id == table_id).first()

def get_tables(db: Session, skip: int = 0, limit: int = 10):
    return db.query(DBTable).offset(skip).limit(limit).all()

def update_table(db: Session, table_id: str, table_update: UpdateTable):
    db_table = db.query(DBTable).filter(DBTable.id == table_id).first()
    if db_table:
        if table_update.name is not None:
            db_table.name = table_update.name
        if table_update.days is not None:
            db_table.days = table_update.days
        
        try:            
            db.commit()
            db.refresh(db_table)
            return db_table
        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=400, detail="Integrity error occurred")
    return db_table

def delete_table(db: Session, table_id: str):
    db_table = db.query(DBTable).filter(DBTable.id == table_id).first()
    if db_table:
        db.delete(db_table)
        db.commit()
    return db_table
