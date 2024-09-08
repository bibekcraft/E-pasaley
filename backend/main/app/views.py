# views.py
from rest_framework import generics
from .models import Category, Product, Testimonial, Coupon,Video,Contact
from .serializers import CategorySerializer, ProductSerializer, TestimonialSerializer, CouponSerializer,VideoSerializer,ContactSerializer
from .serializers import UserRegisterSerializer
from rest_framework.permissions import IsAuthenticated
class CategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class TestimonialListCreateAPIView(generics.ListCreateAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

class CouponListCreateAPIView(generics.ListCreateAPIView):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer

class VideoListCreateAPIView(generics.ListCreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

class ContactListCreateAPIView(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


from django.http import HttpResponse

def home(request):
    return HttpResponse("Hello, world!")

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .renderers import UserRenderers

class UserRegistrationView(APIView):
    renderer_classes = (UserRenderers,)
    def post(self,request,format=None):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):

            user=serializer.save()
            token = get_tokens_for_user(user)
            return Response({'token':token,      "message":"User registered successfully"},status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST) 
    

from .serializers import UserLoginSerializer
from django.contrib.auth import authenticate
class UserLoginView(APIView):
    def post(self,request,format=None): 
        serializer=UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email=serializer.validated_data['email']
            password=serializer.validated_data['password']
            user=authenticate(email=email,password=password)
            if user is not None:
                token=get_tokens_for_user(user)
                return Response({'token':token},status=status.HTTP_200_OK)
                return Response({"message":"User login successfully"},status=status.HTTP_200_OK)
            else:
                return Response({'errors':{'non_field_errors': ['Email or Password is not Valid']}},status=status.HTTP_400_BAD_REQUEST)
        return Response({"message":"User login successfully"},status=status.HTTP_200_OK)


from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserProfileSerializer 
##generate token manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserProfileView(APIView):
    renderer_classes = [UserRenderers]
    permission_classes = [IsAuthenticated]
    def get(self,request,format=None):
        serializer=UserProfileSerializer(request.user)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        

from .serializers import UserChangePasswordSerializer

class UserChangePasswordView(APIView):
    renderer_classes=[UserRenderers]
    permission_classes=[IsAuthenticated]
    def post(self,request,format=None):
        serializer=UserChangePasswordSerializer(data=request.data,context={'request':request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"message":"Password changed successfully"},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

from .serializers import SendPasswordResetEmailSerializer        
class SendPasswordResetEmailView(APIView):
    renderer_classes=[UserRenderers]
    def post(self,request,format=None):
        serializer=SendPasswordResetEmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"message":"Password reset link has been sent to your email"},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
from .serializers import UserPasswordResetserializer
class UserPasswordResetView(APIView):
    renderer_classes=[UserRenderers]
    def post(self,request,uid,token,format=None):
        serializer=UserPasswordResetserializer(data=request.data)
        context={'uid':uid,'token':token} 
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"message":"Password reset successfully"},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)