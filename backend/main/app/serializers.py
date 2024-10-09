from django.contrib.auth.models import User
from rest_framework import serializers
from .models import (
    Category,
    Product,
    Coupon,
    Testimonial,
    Video,
    Contact,
    faq,
    Order

)
from rest_framework.exceptions import ValidationError
class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password']

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        from django.contrib.auth import authenticate
        user = authenticate(username=data['username'], password=data['password'])
        if user is None:
            raise serializers.ValidationError("Incorrect username or password")
        return {'user': user}

# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

# Coupon Serializer
class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = '__all__'

# Testimonial Serializer
class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

# Video Serializer
class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'

# Contact Serializer
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

# FAQ Serializer
class faqSerializer(serializers.ModelSerializer):
    class Meta:
        model = faq
        fields = '__all__'

# Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(many=True, queryset=Product.objects.all())
    product_details = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = '__all__'

    def get_product_details(self, obj):
        # Getting details of products including their category IDs
        return [
            {
                'product_id': product.id,
                'category_id': product.category.id if product.category else None,
                'name': product.name,
                'price': product.price,
            }
            for product in obj.products.all()
        ]

    def create(self, validated_data):
        # Handle products separately
        products_data = validated_data.pop('products')
        order = Order.objects.create(**validated_data)
        # You may want to handle adding products to the order here
        order.products.set(products_data)  # Assuming you want to set the products
        return order

from .models import crausel

class crauselSerializer(serializers.ModelSerializer):
    class Meta:
        model = crausel
        fields = '__all__'