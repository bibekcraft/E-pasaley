from rest_framework import  status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.decorators import api_view
from django.utils import timezone
from django.contrib.auth.models import User
from django.conf import settings

from .models import (
    Category, Product, Coupon, Testimonial, 
    Video, Contact, Order, faq
)
from .serializers import (
    CategorySerializer, ProductSerializer, CouponSerializer, 
    TestimonialSerializer, VideoSerializer, ContactSerializer, 
    faqSerializer, OrderSerializer, 
)


# Category Views
class CategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryDetailAPIView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'pk'


# Product Views
class ProductListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_id = self.request.query_params.get('category', None)
        queryset = Product.objects.all()
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        return queryset


class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_object(self):
        category_id = self.kwargs['category_id']
        product_id = self.kwargs['product_id']
        return Product.objects.get(id=product_id, category_id=category_id)



class ProductListByCategoryAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_id = self.kwargs.get('category_id')
        return Product.objects.filter(category_id=category_id)


# Coupon Views
class CouponListCreateAPIView(generics.ListCreateAPIView):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer


class CouponDetailAPIView(generics.RetrieveAPIView):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer


@api_view(['POST'])
def apply_coupon(request):
    code = request.data.get('code')
    product_cost = request.data.get('product_cost')

    if not code or not product_cost:
        return Response({'error': 'Coupon code and product cost are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        coupon = Coupon.objects.get(code=code)
        if coupon.is_valid():
            discounted_price = max(0, product_cost - coupon.discount_amount)
            return Response({'message': 'Coupon applied!', 'discounted_price': discounted_price}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'This coupon is not valid at this time'}, status=status.HTTP_400_BAD_REQUEST)
    except Coupon.DoesNotExist:
        return Response({'error': 'Invalid coupon code'}, status=status.HTTP_400_BAD_REQUEST)


# Testimonial Views
class TestimonialListCreateAPIView(generics.ListCreateAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer


# Video Views
class VideoListCreateAPIView(generics.ListCreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer


# Contact Views
class ContactListCreateAPIView(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


# FAQ Views
class faqListCreateAPIView(generics.ListCreateAPIView):
    queryset = faq.objects.all()
    serializer_class = faqSerializer


from .models import OrderItem
from .serializers import OrderItemSerializer
class OrderItemCreateView(generics.CreateAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class OrderDetailAPIView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    lookup_field = 'pk'


# User Authentication Views (JWT and Token Based)

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

from .serializers import crauselSerializer
from .models import crausel
from .serializers import modal1Serializer
from .models import modal1
class crauselListCreateAPIView(generics.ListCreateAPIView):
    queryset = crausel.objects.all()
    serializer_class = crauselSerializer

class modal1ListCreateAPIView(generics.ListCreateAPIView):
    queryset = modal1.objects.all()
    serializer_class = modal1Serializer


from rest_framework import viewsets
from .models import Order
from .serializers import OrderSerializer , crauselsofdesignSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

from .models import crauselsofdesign
from .models import Order,OrderItem

class crauselsofdesignListCreateAPIView(generics.ListCreateAPIView):
    queryset = crauselsofdesign.objects.all()
    serializer_class = crauselsofdesignSerializer




from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Order
from .serializers import OrderSerializer

class TrackOrderView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    lookup_field = 'id'  # Track order by order ID

    def get(self, request, *args, **kwargs):
        order = self.get_object()
        serializer = self.get_serializer(order)
        return Response(serializer.data)



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.http import JsonResponse
from django.views import View

from django.http import JsonResponse
from django.views import View

class TrackOrderView(View):
    def get(self, request, order_id, tracking_id):
        # Here you would normally query your database for the order
        # For demonstration purposes, let's say we have the following data:

        orders = {
            '132000002': {'status': 'Shipped', 'days_remaining': 3},
            # Add more orders as needed
        }

        if order_id == tracking_id and order_id in orders:
            order_info = orders[order_id]
            return JsonResponse({
                'status': order_info['status'],
                'days_remaining': order_info['days_remaining'],
            })
        else:
            return JsonResponse({'error': 'Order ID not found.'}, status=404)
