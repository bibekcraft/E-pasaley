from django.db import models
from django.utils import timezone



# /here i wan tot to there is sectionfrom where i can add cateogry .after adding category then it should show 
# what should be kept inside that category .like if i add category as shoes then it should create a different type of shpes sectin

# like addida that means if i add category then it should createa a new page for it and then i can add the product inside that category

# this category section should be foregin key in Product model so that i can add the product inside that category

class Category(models.Model):
    name = models.CharField(max_length=244)
    description = models.TextField()
class Product(models.Model):
    name=models.CharField(max_length=244)
    price=models.DecimalField()
    description=models.TextField()
    Feature=models.TextField()
    Category=models.ForeignKey(Category,on_delete=models.CASCADE)
    image=models.ImageField(upload_to='product')
    

class Testamonails(models.Model):
    name=models.CharField(max_length=244)
    image=models.ImageField(upload_to="testamonails")
    Description=models.TextField()

class Coupen(models.Model):
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

