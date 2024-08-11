from django.db import models

# Create your models here.
class Log(models.Model):
    Name=models.CharField(max_length=100)
    Email=models.CharField(max_length=100)
    Password=models.CharField(max_length=100)
    RegNo=models.CharField(max_length=100)
    Department=models.CharField(max_length=100)
    Year=models.IntegerField()
    Position=models.IntegerField(default=0)
