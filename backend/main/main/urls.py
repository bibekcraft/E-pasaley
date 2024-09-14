from django.contrib import admin
from django.urls import path
from app.views import (
    CategoryListCreateAPIView,
    ProductListCreateAPIView,
    CouponListCreateAPIView,
    TestimonialListCreateAPIView,
    VideoListCreateAPIView,
    ContactListCreateAPIView,
    UserRegistrationView,
    UserLoginView,
    UserProfileView,
    UserChangePasswordView,
    SendPasswordResetEmailView,
    UserPasswordResetView,
    CategoryDetailAPIView,
    ProductDetailAPIView,
    CouponDetailAPIView
)

urlpatterns = [
    # Admin URL
    path('admin/', admin.site.urls),

    # Category URLs
    path('categories/', CategoryListCreateAPIView.as_view(), name='category-list-create'),
    path('category/<int:id>/', CategoryDetailAPIView.as_view(), name='category-detail'),

    # Product URLs
    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('product/<int:id>/', ProductDetailAPIView.as_view(), name='product-detail'),

    # Coupon URLs
    path('coupons/', CouponListCreateAPIView.as_view(), name='coupon-list-create'),
    path('coupon/<int:id>/', CouponDetailAPIView.as_view(), name='coupon-detail'),

    # Testimonial URLs
    path('testimonials/', TestimonialListCreateAPIView.as_view(), name='testimonial-list-create'),

    # Video URLs
    path('videos/', VideoListCreateAPIView.as_view(), name='video-list-create'),

    # Contact URLs
    path('contacts/', ContactListCreateAPIView.as_view(), name='contact-list-create'),

    # User Authentication URLs
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('change-password/', UserChangePasswordView.as_view(), name='change-password'),
    path('send-password-reset-email/', SendPasswordResetEmailView.as_view(), name='send-password-reset-email'),
    path('password-reset/<uid>/<token>/', UserPasswordResetView.as_view(), name='password-reset'),
]
