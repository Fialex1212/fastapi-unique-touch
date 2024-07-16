from fastapi import FastAPI
from sqladmin import Admin, ModelView
from .database import Base, engine
from .auth.models import User
from .posts.models import Post
from .tables.models import Table
from .days.models import Day
from .sessions.models import Session
from .auth.routers import router as user_router
from .posts.routers import router as post_router
from .tables.routers import router as table_router
from .days.routers import router as day_router
from .sessions.routers import router as session_router

Base.metadata.create_all(engine)

app = FastAPI()
admin = Admin(app, engine)

class UserAdmin(ModelView, model=User):
    column_list = [User.id, User.email, User.username]

class PostAdmin(ModelView, model=Post):
    column_list = [Post.id, Post.title, Post.subtitle]

class TableAdmin(ModelView, model=Table):
    column_list = [Table.id, Table.name]

class DayAdmin(ModelView, model=Day):
    column_list = [Day.id, Day.day_name]

class SessionAdmin(ModelView, model=Session):
    column_list = [Session.id, Session.start_time]

admin.add_view(UserAdmin)
admin.add_view(PostAdmin)
admin.add_view(TableAdmin)
admin.add_view(DayAdmin)
admin.add_view(SessionAdmin)

app.include_router(user_router, tags=["User"])
app.include_router(post_router, tags=["Post"])
app.include_router(table_router, tags=["Table"])
app.include_router(day_router, tags=["Day"])
app.include_router(session_router, tags=["Session"])

@app.get("/")
async def root():
    return "Hello page"