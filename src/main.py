from fastapi import FastAPI
from .cors import add_cors
from .admin import init_admin
from .database import Base, engine
from .sessions.routers import router as session_router

Base.metadata.create_all(bind=engine)

app = FastAPI()
add_cors(app)
init_admin(app, engine)
app.include_router(session_router, tags=["Session"])


@app.get("/")
def root():
    return {"message": "hello world"}