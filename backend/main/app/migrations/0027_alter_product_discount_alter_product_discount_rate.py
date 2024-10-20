# Generated by Django 5.1.1 on 2024-10-20 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0026_remove_order_order_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='discount',
            field=models.DecimalField(blank=True, decimal_places=5, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='discount_rate',
            field=models.DecimalField(decimal_places=5, default=0, max_digits=5),
        ),
    ]
