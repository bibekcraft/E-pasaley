from rest_framework import generics
from .models import Category, Product, Coupon, Testimonial, Video, Contact
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    CouponSerializer,
    TestimonialSerializer,
    VideoSerializer,
    ContactSerializer
)

# List/Create views
class CategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        category_name = self.request.query_params.get('category', None)
        subcategory_name = self.request.query_params.get('subcategory', None)
        
        if category_name:
            queryset = queryset.filter(category__name=category_name)
        if subcategory_name:
            queryset = queryset.filter(subcategory__name=subcategory_name)
        
        return queryset

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
    lookup_field = 'pk'


class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'


class CouponDetailAPIView(generics.RetrieveAPIView):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer

# User authentication views
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status

class UserRegistrationView(views.APIView):
    def post(self, request):
        # Implement registration logic
        return Response(status=status.HTTP_201_CREATED)

class UserLoginView(views.APIView):
    def post(self, request):
        # Implement login logic
        return Response(status=status.HTTP_200_OK)

class UserProfileView(views.APIView):
    def get(self, request):
        # Implement profile retrieval logic
        return Response(status=status.HTTP_200_OK)

class UserChangePasswordView(views.APIView):
    def post(self, request):
        # Implement change password logic
        return Response(status=status.HTTP_200_OK)

class SendPasswordResetEmailView(views.APIView):
    def post(self, request):
        # Implement password reset email sending logic
        return Response(status=status.HTTP_200_OK)

class UserPasswordResetView(views.APIView):
    def post(self, request, uid, token):
        # Implement password reset logic
        return Response(status=status.HTTP_200_OK)
