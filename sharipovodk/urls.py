from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from sharipovo.views import CustomUserViewSet, EventTypeViewSet, EventViewSet, SendMailView, TicketViewSet, NewsArticleViewSet
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'event-types', EventTypeViewSet)
router.register(r'events', EventViewSet)
router.register(r'tickets', TicketViewSet)
router.register(r'news', NewsArticleViewSet, basename='news')  # Добавлен новый маршрут для NewsArticleViewSet

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # Включение всех маршрутов из router
    path('api/sendmail/', SendMailView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)