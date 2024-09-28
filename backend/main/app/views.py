from rest_framework import generics
from .models import Category, Product, Coupon, Testimonial, Video, Contact,order,faq
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    CouponSerializer,
    TestimonialSerializer,
    VideoSerializer,
    ContactSerializer,
    orderSerializer,
    faqSerializer
)


class CategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        category_id = self.request.query_params.get('category', None)

        if category_id:
            queryset = queryset.filter(category_id=category_id)

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
from rest_framework import views # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore
from .serializers import UserSerializer

class UserRegistrationView(views.APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
class UserLoginView(views.APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.permissions import IsAuthenticated
class UserProfileView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

from django.contrib.auth import update_session_auth_hash
from rest_framework.permissions import IsAuthenticated

class UserChangePasswordView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not user.check_password(old_password):
            return Response({'error': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        update_session_auth_hash(request, user)  # Keep the user logged in after password change
        return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)

from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator

from django.utils.http import urlsafe_base64_decode
from rest_framework.permissions import AllowAny
class SendPasswordResetEmailView(views.APIView):
    def post(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()

        if not user:
            return Response({'error': 'User with this email does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        reset_link = request.build_absolute_uri(f'/password-reset/{uid}/{token}/')

        subject = 'Password Reset Request'
        message = render_to_string('password_reset_email.html', {
            'reset_link': reset_link,
        })

        send_mail(subject, message, 'no-reply@yourdomain.com', [email])

        return Response({'message': 'Password reset email sent'}, status=status.HTTP_200_OK)

class UserPasswordResetView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request, uid, token):
        try:
            uid = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=uid)
            if default_token_generator.check_token(user, token):
                new_password = request.data.get('new_password')
                user.set_password(new_password)
                user.save()
                return Response({'message': 'Password reset successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'Invalid user'}, status=status.HTTP_400_BAD_REQUEST)
        

from django.utils import timezone
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Coupon

from django.utils import timezone
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Coupon

@api_view(['POST'])
def apply_coupon(request):
    code = request.data.get('code')
    product_cost = request.data.get('product_cost')
    
    if not code or not product_cost:
        return Response({'error': 'Coupon code and product cost are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        coupon = Coupon.objects.get(code=code)
        if coupon.is_valid():
            if product_cost < coupon.discount_amount:
                return Response({'error': 'Product cost is smaller than the discount amount'}, status=status.HTTP_400_BAD_REQUEST)
            discounted_price = product_cost - coupon.discount_amount
            return Response({'message': 'Coupon applied!', 'discounted_price': discounted_price}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'This coupon is not valid at this time'}, status=status.HTTP_400_BAD_REQUEST)
    except Coupon.DoesNotExist:
        return Response({'error': 'Invalid coupon code'}, status=status.HTTP_400_BAD_REQUEST)

class CouponListCreateView(generics.ListCreateAPIView):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer

class CouponDetailView(generics.RetrieveAPIView):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer


class faqListCreateAPIView(generics.ListCreateAPIView):
    queryset = faq.objects.all()
    serializer_class = faqSerializer

class ProductListByCategoryAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_id = self.kwargs.get('category_id')
        return Product.objects.filter(category_id=category_id)

    def get_queryset(self):
        category_id = self.kwargs.get('category_id')
        return Product.objects.filter(category_id=category_id)
    
from app.serializers import orderSerializer
class OrderListCreateAPIView(generics.ListCreateAPIView):
    queryset = order.objects.all()
    serializer_class = orderSerializer

class OrderDetailAPIView(generics.RetrieveAPIView):
    queryset = order.objects.all()
    serializer_class = orderSerializer
    lookup_field = 'pk'  