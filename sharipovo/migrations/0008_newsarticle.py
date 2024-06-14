# Generated by Django 5.0.4 on 2024-06-10 09:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sharipovo', '0007_event_cost'),
    ]

    operations = [
        migrations.CreateModel(
            name='NewsArticle',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('content', models.TextField()),
                ('publication_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]