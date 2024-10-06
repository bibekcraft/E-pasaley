from django.urls import path
from .views import (
    register,
    login,
    refresh_token,
    logout,
    UserChangePasswordView,
    SendPasswordResetEmailView,
    UserPasswordResetView,
)
urlpatterns = [
    
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('refresh-token/', refresh_token, name='refresh-token'),
    path('logout/', logout, name='logout'),
    
    path('change-password/', UserChangePasswordView.as_view(), name='change-password'),
    path('send-password-reset-email/', SendPasswordResetEmailView.as_view(), name='send-password-reset-email'),
    path('password-reset/<uid>/<token>/', UserPasswordResetView.as_view(), name='password-reset'),
]
