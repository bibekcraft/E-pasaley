from rest_framework import serializers
from .models import Category, Product, Coupon, Testimonial, Video, Contact

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'parent', 'category_image']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'initial_price', 'final_price', 'description', 'feature', 'category', 'subcategory', 'discount_rate', 'discount', 'image', 'image1', 'image2', 'image3', 'image4']

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['id', 'code', 'amount', 'active', 'created_at', 'updated_at', 'expiry_date']

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'image', 'description']

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'name', 'video', 'description']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'subject', 'message']
