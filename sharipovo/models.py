from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, unique=True)

class EventType(models.Model):
    id_type = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    image = models.FileField(upload_to='event_types/', blank=True)

    def __str__(self):
        return self.name

class Event(models.Model):
    id_event = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    description = models.TextField()
    date_time = models.DateTimeField()
    event_type = models.ForeignKey(EventType, on_delete=models.SET_NULL, null=True)
    image = models.FileField(upload_to='events/', blank=True)
    total_tickets = models.PositiveIntegerField()  # Общее количество билетов
    rating = models.FloatField(null=True, blank=True)
    cost = models.IntegerField()
    

    def subtract_tickets(self, quantity):
        if self.total_tickets >= quantity:
            self.total_tickets -= quantity
            self.save()
            return True 
        else:
            return False   

    def __str__(self):
        return self.name

    @property
    def available_tickets(self):
        return self.total_tickets - self.ticket_set.count()

class Ticket(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.quantity} tickets for {self.event.name} by User ID: {self.user_id}"