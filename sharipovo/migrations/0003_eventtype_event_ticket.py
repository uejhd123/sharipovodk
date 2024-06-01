# Generated by Django 5.0.4 on 2024-05-25 05:41

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sharipovo', '0002_alter_customuser_phone_number'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventType',
            fields=[
                ('id_type', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200, unique=True)),
                ('description', models.TextField(blank=True)),
                ('image', models.FileField(blank=True, upload_to='event_types/')),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id_event', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('date_time', models.DateTimeField()),
                ('location', models.CharField(max_length=200)),
                ('image', models.FileField(blank=True, upload_to='events/')),
                ('total_tickets', models.PositiveIntegerField()),
                ('rating', models.FloatField(blank=True, null=True)),
                ('event_type', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='sharipovo.eventtype')),
            ],
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField()),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sharipovo.event')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]