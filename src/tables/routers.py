from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from .dependency import get_db
from .schemas import Table, CreateTable, UpdateTable
from .services import create_table, get_table, get_tables, update_table, delete_table
from typing import Annotated

router = APIRouter()

@router.post("/table", response_model=Table)
def create_table_endpoint(
    table: CreateTable,
    db: Session = Depends(get_db)
):
    return create_table(db=db, table=table)

@router.get("/table/{table_id}", response_model=Table)
def get_table_endpoint(
    table_id: str, 
    db: Session = Depends(get_db)
):
    db_table = get_table(db=db, table_id=table_id)
    if db_table is None:
        raise HTTPException(status_code=404, detail="Table not found")
    return db_table

@router.get("/tables", response_model=list[Table])
def get_tables_endpoint(
    skip: Annotated[int, Query(ge=0)],
    limit: Annotated[int, Query(le=10)],
    db: Session = Depends(get_db)
):
    return get_tables(db=db, skip=skip, limit=limit)

@router.put("/table/{table_id}", response_model=Table)
def update_table_endpoint(
    table_id: str,
    table_update: UpdateTable,
    db: Session = Depends(get_db)
):
    db_table = update_table(db=db, table_id=table_id, table_update=table_update)
    if db_table is None:
        raise HTTPException(status_code=404, detail="Table not found")
    return db_table

@router.delete("/table/{table_id}", response_model=Table)
def get_table_endpoint(
    table_id: str, 
    db: Session = Depends(get_db)
):
    db_table = delete_table(db=db, table_id=table_id)
    if db_table is None:
        raise HTTPException(status_code=404, detail="Table not found")
    return db_table