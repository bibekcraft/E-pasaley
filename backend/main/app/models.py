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
    discount_rate = models.DecimalField(max_digits=7, decimal_places=2, default=0)  # Adjusted for 99999.99
    discount = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)  # Adjusted for 999999.99
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

from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError

class Order(models.Model):
    id = models.CharField(max_length=10, primary_key=True, editable=False)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    address_line = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=10)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)

    def generate_id(self):
        """
        Generate a unique ID for each order. Starts from '3132000001' and increments sequentially.
        """
        try:
            last_order = Order.objects.order_by('id').last()
            if last_order:
                last_id = int(last_order.id[4:])  # Extracts the numeric part
                new_id = f"3132{last_id + 1:06d}"
            else:
                new_id = "3132000001"  # Starting ID
        except Exception as e:
            print(f"Error generating order ID: {e}")
            new_id = "3132000001"  # Fallback ID
        return new_id

    def save(self, *args, **kwargs):
        if not self.id:  # Generate ID only if it hasn't been set
            self.id = self.generate_id()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Order {self.id} by {self.first_name} {self.last_name}"

    def total_items(self):
        """
        Calculate the total number of items in the order.
        """
        return sum(item.quantity for item in self.order_items.all())

    def get_order_items(self):
        """
        Fetch all items for this order.
        """
        return self.order_items.all()

class OrderItem(models.Model):
    id = models.CharField(max_length=10, primary_key=True, editable=False)
    order = models.ForeignKey(Order, related_name='order_items', on_delete=models.CASCADE)
    item_number = models.CharField(max_length=100)
    final_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2)
    
    def generate_id(self):
        """
        Generate a unique ID for each order item.
        """
        try:
            last_item = OrderItem.objects.order_by('id').last()
            if last_item:
                last_id = int(last_item.id[4:])  # Extract numeric part
                new_id = f"ITEM{last_id + 1:06d}"
            else:
                new_id = "ITEM000001"
        except Exception as e:
            print(f"Error generating order item ID: {e}")
            new_id = "ITEM000001"  # Fallback ID
        return new_id

    def save(self, *args, **kwargs):
        if not self.id:  # Generate ID only if it hasn't been set
            self.id = self.generate_id()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"OrderItem {self.id} (Order {self.order.id})"

    @property
    def total_price(self):
        """
        Calculate the total price of this order item based on quantity and final price.
        """
        return self.final_price * self.quantity

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


class modal1(models.Model):
    title = models.CharField(max_length=244)
    description = models.TextField()
    image = models.ImageField(upload_to='modal1')

    def __str__(self):
        return self.title
    
class crauselsofdesign(models.Model):
    title = models.CharField(max_length=244)
    description = models.TextField()
    image = models.ImageField(upload_to='crauselsofdesign')

    def __str__(self):
        return self.title
    



from django.db import models

class OrderTracking(models.Model):
    order = models.ForeignKey(Order, related_name='tracking', on_delete=models.CASCADE)
    
    # Status choices
    ORDER_STATUS_CHOICES = [
        ('received', 'Order Received'),
        ('ready', 'Ready to Deliver'),
        ('out_for_delivery', 'Out for Delivery'),
        ('delivered', 'Delivered'),
    ]
    
    status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)  # Automatically set the timestamp when created

    def __str__(self):
        return f"{self.order.id} - {self.status} at {self.timestamp}"
