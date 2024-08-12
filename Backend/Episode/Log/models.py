from django.db import models
from django.contrib.auth.hashers import make_password

class Log(models.Model):
    Name = models.CharField(max_length=100)
    Email = models.EmailField(unique=True)  # Ensure email is unique
    Password = models.CharField(max_length=128)  # Adjusted max_length for hashed passwords
    RegNo = models.CharField(max_length=100, unique=True)  # Ensure RegNo is unique
    Department = models.CharField(max_length=100)
    Year = models.IntegerField()
    Position = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if self.Password and not self.Password.startswith(('pbkdf2_sha256$', 'argon2$', 'bcrypt$')):
            self.Password = make_password(self.Password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.Email
