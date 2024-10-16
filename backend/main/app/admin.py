from django.contrib import admin
from .models import Category, Product, Testimonial, Coupon, Contact, Video, Order,faq,crausel,modal1,crauselsofdesign

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

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'initial_price', 'final_price', 'category',  'description', 'feature','brand','itemnumber')
    list_filter = ('category', 'initial_price','final_price')  
    search_fields = ('name', 'category__name', 'description', 'feature')
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


# Now register the new UserAdmin...
admin.site.register(Order)
admin.site.register(faq)
admin.site.register(crausel)
admin.site.register(Product)
admin.site.register(modal1)
admin.site.register(crauselsofdesign)
