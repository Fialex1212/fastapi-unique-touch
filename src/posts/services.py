from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from .dependency import get_db
from .models import Post as DBPost
from .schemas import CreatePost, UpdatePost

def create_post(db: Session, post: CreatePost):
    db_post = DBPost(**post.model_dump())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def get_post(db: Session, post_id: str):
    return db.query(DBPost).filter(DBPost.id == post_id).firts()

def get_posts(db: Session, skip: int = 0, limit: int = 10):
    return db.query(DBPost).offset(skip).limit(limit).all()

def update_post(db: Session, post_id: str, post_update: UpdatePost):
    db_post = db.query(DBPost).filter(DBPost.id == post_id).first()
    if db_post:
        if post_update.title is not None:
            db_post.title = post_update.title
        if post_update.subtitle is not None:
            db_post.subtitle = post_update.subtitle

        try:
            db.commit()
            db.refresh(db_post)
            return db_post
        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=400, detail="Integrity error occurred")

    return db_post

def delete_post(db: Session, post_id: str):
    db_post = db.query(DBPost).filter(DBPost.id == post_id).first()
    if db_post:
        db.delete(db_post)
        db.commit()
    return db_post
    
