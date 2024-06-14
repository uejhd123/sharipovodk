from requests import Response
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from .models import CustomUser, EventType, Event, NewsArticle, Ticket
from .serializers import CustomUserSerializer, EventTypeSerializer, EventSerializer, NewsArticleSerializer, TicketSerializer
from .smtp import send_email
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import smtplib



class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]

class EventTypeViewSet(viewsets.ModelViewSet):
    queryset = EventType.objects.all()
    serializer_class = EventTypeSerializer
    permission_classes = [AllowAny] 

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [AllowAny] 

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [AllowAny] 
    
class NewsArticleViewSet(viewsets.ModelViewSet):
    queryset = NewsArticle.objects.all()
    serializer_class = NewsArticleSerializer
    permission_classes = [AllowAny]


class SendMailView(APIView):
    def post(self, request):
        subject = request.data.get('subject')
        body = request.data.get('body')
        to = request.data.get('to')

        if subject and body and to:
            send_email(subject, body, to)
            return Response({"status": "success", "message": "Email sent successfully"})
        else:
            return Response({"status": "error", "message": "Missing required fields"}, status=400)