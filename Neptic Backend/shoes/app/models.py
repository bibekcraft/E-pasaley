from django.db import models



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

