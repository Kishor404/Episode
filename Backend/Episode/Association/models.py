from django.db import models

# Create your models here.

class Association(models.Model):
    Name=models.CharField(max_length=100)
    Logo=models.CharField(max_length=200)
    Roles=models.JSONField(default=dict)

    def __str__(self):
        return self.Name
