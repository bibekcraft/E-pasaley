from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from app.views import (
    CategoryListCreateAPIView, CategoryDetailAPIView, ProductListCreateAPIView,
    TestimonialListCreateAPIView, VideoListCreateAPIView, ContactListCreateAPIView,
    OrderCreateView, faqListCreateAPIView, CouponListCreateAPIView, RegisterView, LoginView,crauselListCreateAPIView
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # Other application URLs
    path('categories/', CategoryListCreateAPIView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryDetailAPIView.as_view(), name='category-detail'),
    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('coupons/', CouponListCreateAPIView.as_view(), name='coupon-list-create'),
    path('testimonials/', TestimonialListCreateAPIView.as_view(), name='testimonial-list-create'),
    path('videos/', VideoListCreateAPIView.as_view(), name='video-list-create'),
    path('contacts/', ContactListCreateAPIView.as_view(), name='contact-list-create'),
    path('orders/', OrderCreateView.as_view(), name='order-create'),
    path('faqs/', faqListCreateAPIView.as_view(), name='faq-list-create'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('crausels/', crauselListCreateAPIView.as_view(), name='crausel-list-create'),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
