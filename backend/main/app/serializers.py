# serializers.py
import token
from rest_framework import serializers
from .models import Category, Product, Testimonial, Coupon,Video,Contact

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'parent','category_image']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'initial_price','final_price', 'description', 'feature', 'category', 'image','image1','image2','image3','image4']

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

from app.models import User 

class UserRegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password1',"password2","tc"]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, attrs):
        password = attrs.get('password1')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError({'password': 'Password must match.'})
        return attrs
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['password' 'email', ]

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email']


class UserChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    new_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    confirm_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user=self.context.get('user')
        if password != password2:
            raise serializers.ValidationError({'password': 'Password must match.'}) 
        user.set_password(password)
        user.save()
        return attrs
    
from django.contrib.auth.tokens import default_token_generator

from rest_framework import serializers
from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail



class SendPasswordResetEmailSerializer(serializers.ModelSerializer):

    email = serializers.EmailField()

    class Meta:
        model = User
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            User.objects.get(email=email)
            user = User.objects.get(email=email)
            uid=urlsafe_base64_encode(force_bytes(user.pk))
            user = User.objects.get(email=email)
            token=PasswordResetTokenGenerator().make_token(user)
            link='http://localhost:8000/reset-password/'+uid+'/'+token
            print('Password reset link:',link)
            print('Password reset token',token)
            link='http://localhost:8000/reset-password/'+uid+'/'+token, print('Password reset link:',link)
            return attrs    
            raise serializers.ValidationError({'email': 'User does not exist.'})
        return super().validate(attrs)

from django.utils.encoding import smart_str
from django.utils.http import urlsafe_base64_decode
from rest_framework.exceptions import ValidationError
from django.contrib.auth.tokens import PasswordResetTokenGenerator

class UserPasswordResetserializer(serializers.Serializer):
    old_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    new_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    confirm_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['password', 'password2']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uid = self.context.get('uid')
            token = self.context.get('token')
            user = self.context.get('user')
            if password != password2:
                raise serializers.ValidationError({'password': 'Password must match.'}) 
            id = smart_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise ValidationError('Token is not valid')
            user.set_password(password)
            user.save()
            return attrs
        except Exception as identifier:
            PasswordResetTokenGenerator().check_token(user, token)
            raise ValidationError('Token is not valid')