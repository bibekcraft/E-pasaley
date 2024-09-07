# serializers.py
from rest_framework import serializers
from .models import Category, Product, Testimonial, Coupon,Video,Contact

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'parent']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'description', 'feature', 'category', 'image']

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'image', 'description']

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['id', 'code', 'amount', 'active', 'created_at', 'updated_at', 'expiry_date']

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'name', 'description']
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'subject', 'message']