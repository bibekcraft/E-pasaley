from django.contrib import admin
from .models import Category, Product, Testamonails, Coupen  # Import all models

# Register Category model
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')  # Display fields in the list view
    search_fields = ('name', 'description')  # Add search functionality by name and description
    list_filter = ('name',)  # Filter by category name

# Register Product model
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'Category', 'description', 'Feature')  # Display fields
    list_filter = ('Category', 'price')  # Filter products by category and price
    search_fields = ('name', 'Category__name', 'description', 'Feature')  # Search by product name, category name, description, and features

# Register Testamonails model
@admin.register(Testamonails)
class TestamonailsAdmin(admin.ModelAdmin):
    list_display = ('name', 'Description')  # Display fields
    search_fields = ('name', 'Description')  # Add search functionality
    list_filter = ('name',)  # Filter by name

# Register Coupen model
@admin.register(Coupen)
class CoupenAdmin(admin.ModelAdmin):
    list_display = ('code', 'amount', 'active', 'expiry_date', 'created_at', 'updated_at')  # Display fields
    list_filter = ('active', 'expiry_date')  # Filter by active status and expiry date
    search_fields = ('code',)  # Add search functionality by code
