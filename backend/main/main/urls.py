from django.contrib import admin
from django.urls import path
from app.views import (
    CategoryListCreateAPIView,
    ProductListCreateAPIView,
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
    CouponListCreateView,
    CouponDetailView,
    OrderDetailAPIView,
    faqListCreateAPIView,
    ProductListByCategoryAPIView,
    OrderListCreateAPIView
)

urlpatterns = [
    # Admin URL
    path('admin/', admin.site.urls),

    # Category URLs
    path('categories/', CategoryListCreateAPIView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryDetailAPIView.as_view(), name='category-detail'),

    # Product URLs
    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('allproducts/<int:category_id>/<int:product_id>/', ProductDetailAPIView.as_view(), name='product-detail-by-category'),

    
      path('coupons/', CouponListCreateView.as_view(), name='coupon-list-create'),
    path('coupons/<int:pk>/', CouponDetailView.as_view(), name='coupon-detail'),
       
       
          # Testimonial URLs
    path('testimonials/', TestimonialListCreateAPIView.as_view(), name='testimonial-list-create'),

        path('categories/<int:category_id>/products/', ProductListByCategoryAPIView.as_view(), name='product-list-by-category'),

    # Video URLs
    path('videos/', VideoListCreateAPIView.as_view(), name='video-list-create'),

    # Contact URLs
    path('contacts/', ContactListCreateAPIView.as_view(), name='contact-list-create'),
    path('orders/', OrderListCreateAPIView.as_view(), name='order-list-create'),
    path('orders/<int:pk>/', OrderDetailAPIView.as_view(), name='order-detail'),
    path('faqs/', faqListCreateAPIView.as_view(), name='faq-list-create'),

    # User Authentication URLs
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('change-password/', UserChangePasswordView.as_view(), name='change-password'),
    path('send-password-reset-email/', SendPasswordResetEmailView.as_view(), name='send-password-reset-email'),
    path('password-reset/<uid>/<token>/', UserPasswordResetView.as_view(), name='password-reset'),
]
from main import settings
from django.conf.urls.static import static # type: ignore

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)