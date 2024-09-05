from django.db import models
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=244)
    description = models.TextField()
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='subcategories')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"

class Product(models.Model):
    name = models.CharField(max_length=244)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Specify max_digits and decimal_places
    description = models.TextField()
    feature = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    image = models.ImageField(upload_to='product')

    def __str__(self):
        return self.name

class Testimonial(models.Model):  # Corrected spelling
    name = models.CharField(max_length=244)
    image = models.ImageField(upload_to="testimonials")
    description = models.TextField()

    def __str__(self):
        return self.name

class Coupon(models.Model):  # Corrected spelling
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
