from django.db import models
from django.utils import timezone
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
class Category(models.Model):
    name = models.CharField(max_length=244)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='subcategories')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"

    @property
    def is_main_category(self):
        """Check if the category is a main category."""
        return self.parent is None

    @property
    def is_subcategory(self):
        """Check if the category is a subcategory."""
        return self.parent is not None

    def get_subcategories(self):
        """Return all subcategories of this category."""
        return self.subcategories.all()

    def get_products(self):
        """Return all products under this category."""
        return self.products.all()
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=244)
    initial_price = models.DecimalField(max_digits=10, decimal_places=2)
    final_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Include final_price as a field
    description = models.TextField()
    feature = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products', null=True, blank=True)
    subcategory = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='sub_products', null=True, blank=True)
    discount_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # Discount rate field
    discount = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    image = models.ImageField(upload_to='product')
    image1 = models.ImageField(default='default_image.jpg', upload_to='images/')
    image2 = models.ImageField(default='default_image.jpg', upload_to='images/')
    image3 = models.ImageField(default='default_image.jpg', upload_to='images/')
    image4 = models.ImageField(default='default_image.jpg', upload_to='images/')

    def __str__(self):
        return self.name
    
    @property
    def discount_amount(self):
        discount = self.discount or 0  # Use 0 if discount is None
        return self.initial_price * (discount / 100)

    def save(self, *args, **kwargs):
        """Override save method to calculate final_price and enforce business logic."""
        # Calculate the final price before saving
        self.final_price = self.initial_price - self.discount_amount

        # Ensure a product is assigned to either a category or a subcategory, not both.
        if self.category and self.subcategory:
            raise ValueError("Product can belong to either a main category or a subcategory, not both.")
        
        # Ensure the subcategory belongs to the selected category
        if self.subcategory and (self.subcategory.parent != self.category):
            raise ValueError("Subcategory must belong to the selected main category.")
        
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
class MyUserManager(BaseUserManager):
    def create_user(self, email, name,tc, password=None,password2=None):
        """
        Creates and saves a User with the given email, name tc and pass
        
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            tc=tc,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name,tc, password=None):
        """
        Creates and saves aself, email, name,tc, password=None
        """
        user = self.create_user(
            email,
            password=password,
            name=name,
            tc=tc
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

    

class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    tc=models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) 

    objects = MyUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "tc"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin    