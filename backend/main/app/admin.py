from django.contrib import admin
from .models import Category, Product, Testimonial, Coupon, Contact, Video, Order,faq

# Register Category model
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent','category_image','id')
    search_fields = ['name','id']
    list_filter = ('parent',)

# Register Product model
# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = ('name', 'initial_price', 'final_price', 'category',  'description', 'feature','brand','itemnumber')
#     list_filter = ('category', 'initial_price','final_price')  # Remove 'final_price' from here
#     search_fields = ('name', 'category__name', 'description', 'feature')


 

#     # Define the fields to be included in the form
#     fields = ('brand','name', 'initial_price','final_price', 'description', 'feature', 'category', 'discount_rate','discount', 'image', 'image1', 'image2', 'image3', 'image4','itemnumber')

#     # Optional: Display ordering


# Register Testimonial model
@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name', 'description')
    list_filter = ('name',)


admin.site.register(Coupon)
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

from app.models import User # type: ignore
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class UserModelAdmin(BaseUserAdmin):

    # The fields to be used in displaying the UserModelAdmin.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ["id","email", "name","tc", "is_admin"]
    list_filter = ["is_admin"]
    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["name","tc",]}),
        ("Permissions", {"fields": ["is_admin"]}),
    ]
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "name","tc", "password1", "password2"],
            },
        ),
    ]
    search_fields = ["email"]
    ordering = ["email","id"]
    filter_horizontal = []


# Now register the new UserAdmin...
admin.site.register(User, UserModelAdmin)
admin.site.register(Order)
admin.site.register(faq)
admin.site.register(Product)