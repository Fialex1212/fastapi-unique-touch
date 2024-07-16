from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from .dependency import get_db
from .schemas import Day, CreateDay, UpdateDay
from .services import create_day, get_day, get_days, update_day, delete_day
from typing import Annotated

router = APIRouter()

@router.post("/day", response_model=Day)
def create_day_endpoint(
    day: CreateDay,
    db: Session = Depends(get_db)
):
    return create_day(db=db, day=day)

@router.get("/day/{day_id}", response_model=Day)
def get_day_endpoint(
    day_id: str,
    db: Session = Depends(get_db)
):
    db_day = get_day(db=db, day_id=day_id)
    if db_day is None:
        raise HTTPException(status_code=404, detail="Day not found")
    return db_day

@router.get("/days", response_model=list[Day])
def get_days_endpoint(
    skip: Annotated[int, Query(ge=0)],
    limit: Annotated[int, Query(le=10)],
    db: Session = Depends(get_db)
):
    return get_days(db=db, skip=skip, limit=limit)

@router.put("/day/{day_ud}", response_model=Day)
def update_day_endpoint(
    day_id: str,
    day_update: UpdateDay,
    db: Session = Depends(get_db)
):
    db_day = update_day(db=db, day_id=day_id, day_update=day_update)
    if db_day is None:
        raise HTTPException(status_code=404, detail="Day not found")
    return db_day

@router.delete("/day/{day_id}", response_model=Day)
def delete_day_endpoint(
    day_id: str,
    db: Session = Depends(get_db)
):
    db_day = delete_day(db=db, day_id=day_id)
    if db_day is None:
        raise HTTPException(status_code=404, detail="Day not found")
    return db_day