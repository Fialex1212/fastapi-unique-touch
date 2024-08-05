from fastapi import APIRouter, HTTPException, Query, Depends
from sqlalchemy.orm import Session
from ..dependency import get_db
from .schemas import CreateSession, UpdateSession, Session
from .services import create_session, get_session, get_sessions, update_session, delete_session
from typing import List, Annotated

router = APIRouter()

@router.post("/create", response_model=Session)
def create_session_endpoint(
    session: CreateSession,
    db: Session = Depends(get_db)
):
    return create_session(db=db, session=session)

@router.get("/get/{session_id}", response_model=Session)
def get_session_endpoint(
    session_id: str,
    db: Session = Depends(get_db)
):
    return get_session(db=db, session_id=session_id)

@router.get("/get_sessions", response_model=List[Session])
def get_sessions_endpoint(
    skip: Annotated[int, Query(le=0)],
    limit: Annotated[int, Query(le=10)],
    db: Session = Depends(get_db)
):
    return get_sessions(db=db, skip=skip, limit=limit)

@router.put("/update/{session_id}", response_model=Session)
def update_session_endpoint(
    session_id: str,
    session_update: UpdateSession,
    db: Session = Depends(get_db)
):
    db_session = update_session(db=db, session_id=session_id, session_update=session_update)
    if db_session is None:
        raise HTTPException(status_code=404, detail="Session not found")
    return db_session

@router.delete("/delete/{session_id}", response_model=Session)
def delete_session_endpoint(
    session_id: str,
    db: Session = Depends(get_db)
):
    db_session = delete_session(db=db, session_id=session_id)
    if db_session is None:
        raise HTTPException(status_code=404, detail="Session not found")
    return db_session