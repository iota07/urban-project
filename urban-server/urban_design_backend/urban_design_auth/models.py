from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager

username_validator = RegexValidator(
    regex=r'^[\w\s]+$',
    message=_('The username may contain alphanumeric characters and spaces only.')
)

# Create your models here.

class CustomUser(AbstractUser):
    username = models.CharField(
        _('username'),
        max_length=100, 
        unique=True,
        help_text=_('Required. 100 characters or fewer. Letters, digits, and spaces only.'),
        validators=[username_validator],
        error_messages={
            'unique': _("A user with that username already exists."),
        },
        null=True,
        blank=True,
    )
    email = models.EmailField(_('email address'), unique=True)
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    organisation = models.CharField(max_length=100, blank=True)
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'name', 'surname']
    objects = CustomUserManager()

    def __str__(self):
        return self.username