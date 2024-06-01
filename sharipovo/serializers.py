from rest_framework import serializers
from .models import CustomUser, EventType, Event, Ticket

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone_number', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone_number=validated_data.get('phone_number', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    

class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventType
        fields = ['id_type', 'name', 'description', 'image']

class EventSerializer(serializers.ModelSerializer):
    event_type = EventTypeSerializer(read_only=True)
    available_tickets = serializers.IntegerField(read_only=True)

    class Meta:
        model = Event
        fields = ['id_event', 'name', 'description', 'date_time', 'event_type', 'image', 'total_tickets', 'rating', 'available_tickets', 'cost']

class TicketSerializer(serializers.ModelSerializer):
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())

    class Meta:
        model = Ticket
        fields = ['id', 'event', 'quantity', 'user']
        extra_kwargs = {
            'event': {'write_only': True},
        }