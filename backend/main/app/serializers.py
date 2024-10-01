from rest_framework import serializers
from .models import Category, Product, Coupon, Testimonial, Video, Contact,faq

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


from .models import Coupon

from .models import Coupon
import datetime 
class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = '__all__' 

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

from .models  import Order

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
        return order


class faqSerializer(serializers.ModelSerializer):
    class Meta:
        model = faq
        fields = '__all__'

from .models import User
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'tc', 'password', 'is_active', 'is_admin', 'created_at', 'updated_at')

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User.objects.create_user(**validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        instance.email = validated_data.get('email', instance.email)
        instance.name = validated_data.get('name', instance.name)
        instance.tc = validated_data.get('tc', instance.tc)

        if password:
            instance.set_password(password)

        instance.save()
        return instance



