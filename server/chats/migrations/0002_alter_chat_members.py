# Generated by Django 3.2.7 on 2021-09-24 20:16

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chats', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='members',
            field=models.ManyToManyField(blank=True, related_name='chats', to=settings.AUTH_USER_MODEL, verbose_name='users'),
        ),
    ]