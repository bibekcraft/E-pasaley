# Generated by Django 5.1.1 on 2024-09-24 09:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_rename_amount_coupon_discount_amount_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=244)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.IntegerField()),
                ('address', models.CharField(max_length=244)),
                ('city', models.CharField(max_length=244)),
                ('state', models.CharField(max_length=244)),
                ('zipcode', models.IntegerField()),
                ('product', models.CharField(max_length=244)),
                ('quantity', models.IntegerField()),
                ('price', models.IntegerField()),
                ('total', models.IntegerField()),
                ('product_id', models.IntegerField()),
                ('product_name', models.CharField(max_length=244)),
                ('product_image', models.ImageField(upload_to='orders')),
            ],
        ),
    ]
