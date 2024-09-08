
from django.contrib import admin
from django.urls import path
from app.views import CategoryListCreateAPIView,ProductListCreateAPIView,CouponListCreateAPIView,TestimonialListCreateAPIView,VideoListCreateAPIView,ContactListCreateAPIView
from app.views import UserRegistrationView
from app.views import UserLoginView
from app.views import UserChangePasswordView
from app.views import UserProfileView
from app.views import UserPasswordResetView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('categories/', CategoryListCreateAPIView.as_view(), name='category-list-create'),
    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('testimonials/', TestimonialListCreateAPIView.as_view(), name='testimonial-list-create'),
    path('coupons/', CouponListCreateAPIView.as_view(), name='coupon-list-create'),
    path('videos/', VideoListCreateAPIView.as_view(), name='video-list-create'),
    path('contacts/', ContactListCreateAPIView.as_view(), name='contact-list-create'),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserLoginView.as_view(), name='login'),
    path('change-password/<uid>/<token>/', UserChangePasswordView.as_view(), name='change-password'),
    path('password-reset/<uid>/<token>/', UserPasswordResetView.as_view(), name='password-reset'),


 
]
