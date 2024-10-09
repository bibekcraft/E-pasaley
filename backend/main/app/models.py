from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from datetime import datetime

class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, related_name='subcategories')
    category_image = models.ImageField(upload_to='categories/', null=True, blank=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"

    @property
    def is_main_category(self):
        return self.parent is None

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def get_products(self):
        return self.products.all()

class Product(models.Model):
    brand = models.CharField(max_length=244, default='your brand name')
    name = models.CharField(max_length=244)
    initial_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    final_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    description = models.TextField()
    feature = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products', null=True, blank=True)
    discount_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    discount = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    image = models.ImageField(upload_to='product')
    image1 = models.ImageField(default='default_image.jpg', upload_to='images/')
    image2 = models.ImageField(default='default_image.jpg', upload_to='images/')
    image3 = models.ImageField(default='default_image.jpg', upload_to='images/')
    image4 = models.ImageField(default='default_image.jpg', upload_to='images/')
    itemnumber = models.TextField(default='PMS-0001')

    def __str__(self):
        return self.name

    @property
    def discount_amount(self):
        return self.initial_price * (self.discount_rate / 100)

class Testimonial(models.Model):
    name = models.CharField(max_length=244)
    image = models.ImageField(upload_to="testimonials")
    description = models.TextField()

    def __str__(self):
        return self.name

class Coupon(models.Model):
    code = models.CharField(max_length=20, unique=True)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateTimeField(default=datetime.now)
    end_date = models.DateTimeField(default=datetime.now) 
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.code

    def is_valid(self):
        now = timezone.now()
        return self.is_active and self.start_date <= now <= self.end_date

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

# Custom User and Manager


class Order(models.Model):
    firstName = models.CharField(max_length=244, default='nothing')
    lastName = models.CharField(max_length=244, default='nothing')
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    zipcode = models.CharField(max_length=10)
    addressLine = models.CharField(max_length=244, default='nothing')
    city = models.CharField(max_length=244)
    state = models.CharField(max_length=244)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    products = models.ManyToManyField(Product)

    def __str__(self):
        return f"Order by {self.firstName}"

class faq(models.Model):
    title = models.CharField(max_length=244)
    description = models.TextField()

    def __str__(self):
        return self.title

class crausel(models.Model):
    title = models.CharField(max_length=244)
    description = models.TextField()
    image = models.ImageField(upload_to='crausel')

    def __str__(self):
        return self.title