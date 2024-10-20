# Generated by Django 5.1.1 on 2024-10-20 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0027_alter_product_discount_alter_product_discount_rate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='discount',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=9, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='discount_rate',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=7),
        ),
    ]
