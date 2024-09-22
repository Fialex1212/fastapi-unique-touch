from django.urls import path
from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import UserRegisterView, UserListCreateView, UserDetailView

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", UserRegisterView.as_view(), name="register"),
    path("users/", UserListCreateView.as_view(), name="list_users"),
    path("user/<str:id>/", UserDetailView.as_view(), name="user"),
]