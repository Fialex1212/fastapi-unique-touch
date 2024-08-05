from fastapi import FastAPI
from sqladmin import Admin, ModelView
from .users.models import User
from .images.models import Image
from .posts.models import Post
from .sessions.models import Session

class UserAdmin(ModelView, model=User):
    column_list = [User.id, User.username, User.role]

class ImageAdmin(ModelView, model=Image):
    column_list = [Image.id, Image.filename, Image.filepath]

class PostAdmin(ModelView, model=Post):
    column_list = [Post.id, Post.title, Post.description]

class SessionAdmin(ModelView, model=Session):
    column_list = [Session.id, Session.time, Session.user]

def init_admin(app: FastAPI, engine):
    admin = Admin(app, engine)
    admin.add_view(UserAdmin)
    admin.add_view(ImageAdmin)
    admin.add_view(PostAdmin)
    admin.add_view(SessionAdmin)

    