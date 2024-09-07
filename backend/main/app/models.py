from django.db import models
from django.utils import timezone
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

class Category(models.Model):
    name = models.CharField(max_length=244)
    description = models.TextField(blank=True, null=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='subcategories')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"

class Product(models.Model):
    name = models.CharField(max_length=244)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    feature = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    image = models.ImageField(upload_to='product')
    image1 = models.ImageField(default='default_image.jpg', upload_to='images/')
    image2 = models.ImageField(default='default_image.jpg', upload_to='images/')
    image3 = models.ImageField(default='default_image.jpg', upload_to='images/')
    image4 = models.ImageField(default='default_image.jpg', upload_to='images/')
    
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # Discount amount field
    discount_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0, editable=False)  # Discount rate field

    def __str__(self):
        return self.name

    def get_discounted_price(self):
        """Calculate the price after discount."""
        return self.price - self.discount_amount

    def save(self, *args, **kwargs):
        """Override save method to calculate discount rate."""
        if self.price and self.discount_amount:
            self.discount_rate = (self.discount_amount / self.price) * 100
        else:
            self.discount_rate = 0
        super().save(*args, **kwargs)

class Testimonial(models.Model):
    name = models.CharField(max_length=244)
    image = models.ImageField(upload_to="testimonials")
    description = models.TextField()

    def __str__(self):
        return self.name

class Coupon(models.Model):
    code = models.CharField(max_length=20, unique=True)  # Unique coupon code
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Discount amount
    active = models.BooleanField(default=True)  # Status of the coupon
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    expiry_date = models.DateTimeField(blank=True, null=True)  # Optional expiry date

    def __str__(self):
        return f"{self.code} - {self.amount}"

    def is_valid(self):
        """Check if the coupon is valid (e.g., active and not expired)."""
        if not self.active:
            return False
        if self.expiry_date and self.expiry_date < timezone.now():
            return False
        return True

class Video(models.Model):
    name = models.CharField(max_length=244)
    video = models.FileField(upload_to='video')
    description = models.TextField()

    def __str__(self):
        return self.name

class Contact(models.Model):
    name = models.CharField(max_length=244)
    email = models.EmailField()
    subject = models.CharField(max_length=244)
    message = models.TextField()

    def __str__(self):
        return self.name