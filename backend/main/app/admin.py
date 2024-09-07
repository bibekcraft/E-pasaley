from django.contrib import admin
from .models import Category, Product, Testimonial, Coupon, Contact, Video

# Register Category model
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'parent')
    search_fields = ('name', 'description')
    list_filter = ('name',)

# Register Product model
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'description', 'feature')
    list_filter = ('category', 'price')
    search_fields = ('name', 'category__name', 'description', 'feature')

# Register Testimonial model
@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name', 'description')
    list_filter = ('name',)

# Register Coupon model
@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ('code', 'amount', 'active', 'expiry_date', 'created_at', 'updated_at')
    list_filter = ('active', 'expiry_date')
    search_fields = ('code',)

# Register Video model
@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name', 'description')
    list_filter = ('name',)

# Register Contact model
@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'message')
    search_fields = ('name', 'email', 'subject', 'message')
    list_filter = ('name', 'email', 'subject', 'message')
