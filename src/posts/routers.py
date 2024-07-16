from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from .dependency import get_db
from .schemas import Post, CreatePost, UpdatePost
from .services import create_post, get_post, get_posts, update_post, delete_post
from typing import Annotated

router = APIRouter()

@router.post("/post", response_model=Post)
def create_post_endpoint(
    post: Annotated[CreatePost, Depends()],
    db: Session = Depends(get_db)
):
    return create_post(db=db, post=post)

@router.get("/post/{post_id}", response_model=Post)
def create_post_endpoint(
    post_id: str,
    db: Session = Depends(get_db)
):
    db_post = get_post(db=db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@router.get("/posts", response_model=Post)
def create_post_endpoint(
    skip: Annotated[int, Query(ge=0)],
    limit: Annotated[int, Query(le=10)],
    db: Session = Depends(get_db)
):
    return get_posts(db=db, skip=skip, limit=limit)

@router.put("/post/{post_id}", response_model=Post)
def create_post_endpoint(
    post_id: str,
    post_update: Annotated[UpdatePost, Depends()],
    db: Session = Depends(get_db)
):
    db_post = update_post(db=db, post_id=post_id, post_update=post_update)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@router.delete("/post/{post_id}", response_model=Post)
def create_post_endpoint(
    post_id: str,
    db: Session = Depends(get_db)
):
    db_post = delete_post(db=db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post


