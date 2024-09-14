from rest_framework import generics
from .models import Category, Product, Coupon, Testimonial, Video, Contact
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    CouponSerializer,
    TestimonialSerializer,
    VideoSerializer,
    ContactSerializer,
)

# List/Create views
class CategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CouponListCreateAPIView(generics.ListCreateAPIView):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer

class TestimonialListCreateAPIView(generics.ListCreateAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

class VideoListCreateAPIView(generics.ListCreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

class ContactListCreateAPIView(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

# Detail views
class CategoryDetailAPIView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CouponDetailAPIView(generics.RetrieveAPIView):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer

# User authentication views
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status

class UserRegistrationView(views.APIView):
    # Implement registration logic
    def post(self, request):
        # Registration logic here
        return Response(status=status.HTTP_201_CREATED)

class UserLoginView(views.APIView):
    # Implement login logic
    def post(self, request):
        # Login logic here
        return Response(status=status.HTTP_200_OK)

class UserProfileView(views.APIView):
    # Implement profile retrieval logic
    def get(self, request):
        # Retrieve profile logic here
        return Response(status=status.HTTP_200_OK)

class UserChangePasswordView(views.APIView):
    # Implement change password logic
    def post(self, request):
        # Change password logic here
        return Response(status=status.HTTP_200_OK)

class SendPasswordResetEmailView(views.APIView):
    # Implement password reset email sending logic
    def post(self, request):
        # Send reset email logic here
        return Response(status=status.HTTP_200_OK)

class UserPasswordResetView(views.APIView):
    # Implement password reset logic
    def post(self, request, uid, token):
        # Reset password logic here
        return Response(status=status.HTTP_200_OK)
