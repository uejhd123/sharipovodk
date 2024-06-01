from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser,EventType, Event, Ticket

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'phone_number')  # Добавьте ваше новое поле в список
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('phone_number',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('phone_number',)}),
    )

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(EventType)
admin.site.register(Event)
admin.site.register(Ticket)