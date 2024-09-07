from django.contrib import admin
from .models import Category, Product, Testimonial, Coupon  # Corrected model names

# Register Category model
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'parent')  # Added parent to display
    search_fields = ('name', 'description')  # Add search functionality by name and description
    list_filter = ('name',)  # Filter by category name

# Register Product model
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'description', 'feature')  # Changed Category to lowercase category
    list_filter = ('category', 'price')  # Filter products by category and price
    search_fields = ('name', 'category__name', 'description', 'feature')  # Search by product name, category name, description, and features

# Register Testimonial model
@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')  # Display fields
    search_fields = ('name', 'description')  # Add search functionality
    list_filter = ('name',)  # Filter by name

# Register Coupon model
@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ('code', 'amount', 'active', 'expiry_date', 'created_at', 'updated_at')  # Display fields
    list_filter = ('active', 'expiry_date')  # Filter by active status and expiry date
    search_fields = ('code',)  # Add search functionality by code
