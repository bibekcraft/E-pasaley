from django.contrib import admin
from .models import Category, Product, Testimonial, Coupon,Contact,Video  # Corrected model names

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


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name', 'description')
    list_filter = ('name',)

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'message')
    search_fields = ('name', 'email', 'subject', 'message')
    list_filter = ('name', 'email', 'subject', 'message')


from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

class UserAdmin(BaseUserAdmin):
    list_display = ["id", "email", "name", "is_admin"]
    list_filter = ["is_admin"]
    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["name"]}),
        ("Permissions", {"fields": ["is_admin"]}),
    ]
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "name", "password1", "password2"],
            },
        ),
    ]
    search_fields = ["email"]
    ordering = ["email", 'id']
    filter_horizontal = []

admin.site.register(User, UserAdmin)
