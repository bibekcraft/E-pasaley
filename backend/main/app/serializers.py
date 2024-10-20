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
    Order,
    OrderItem,
    crausel,
    modal1,
    crauselsofdesign
)
from rest_framework.exceptions import ValidationError

# Register Serializer
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

# Login Serializer
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

# OrderItem Serializer
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'item_number', 'final_price', 'quantity', 'total']

# Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'first_name', 'last_name', 'email', 'phone', 
                  'address_line', 'city', 'state', 'zip_code', 
                  'total_cost', 'order_items']

    def create(self, validated_data):
        order_items_data = validated_data.pop('order_items')
        order = Order.objects.create(**validated_data)
        OrderItem.objects.bulk_create([
            OrderItem(order=order, **item_data) for item_data in order_items_data
        ])
        return order
    


    def update(self, instance, validated_data):
        order_items_data = validated_data.pop('order_items', None)

        # Update Order instance
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update order items
        if order_items_data is not None:
            # Clear existing order items
            instance.order_items.all().delete()
            # Create new order items
            for item_data in order_items_data:
                OrderItem.objects.create(order=instance, **item_data)

        return instance

# Carousel Serializer
class crauselSerializer(serializers.ModelSerializer):
    class Meta:
        model = crausel
        fields = '__all__'

# Modal1 Serializer
class modal1Serializer(serializers.ModelSerializer):
    class Meta:
        model = modal1
        fields = '__all__'

# Carousel of Design Serializer
class crauselsofdesignSerializer(serializers.ModelSerializer):
    class Meta:
        model = crauselsofdesign
        fields = '__all__'
