from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from main import settings
from app.views import CategoryListCreateAPIView, CategoryDetailAPIView, ProductListCreateAPIView, CouponListCreateView, TestimonialListCreateAPIView, VideoListCreateAPIView, ContactListCreateAPIView, OrderCreateView, faqListCreateAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Include the auth URLs under the 'auth/' prefix
    path('auth/', include('app.urls')),  # Includes all user-related URLs from app.urls

    # Other URLs for your application
    path('categories/', CategoryListCreateAPIView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryDetailAPIView.as_view(), name='category-detail'),
    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('coupons/', CouponListCreateView.as_view(), name='coupon-list-create'),
    path('testimonials/', TestimonialListCreateAPIView.as_view(), name='testimonial-list-create'),
    path('videos/', VideoListCreateAPIView.as_view(), name='video-list-create'),
    path('contacts/', ContactListCreateAPIView.as_view(), name='contact-list-create'),
    path('orders/', OrderCreateView.as_view(), name='order-create'),
    path('faqs/', faqListCreateAPIView.as_view(), name='faq-list-create'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
