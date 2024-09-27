# Generated by Django 5.1 on 2024-09-27 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_faq'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='product',
        ),
        migrations.RemoveField(
            model_name='order',
            name='product_id',
        ),
        migrations.RemoveField(
            model_name='order',
            name='product_image',
        ),
        migrations.AddField(
            model_name='order',
            name='itemnumber',
            field=models.TextField(default='nothing'),
        ),
    ]
