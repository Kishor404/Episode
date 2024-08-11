from django.db import models

# Create your models here.
class Event(models.Model):
    Name=models.CharField(max_length=100)
    Venue=models.CharField(max_length=100,blank=True)
    Status=models.IntegerField(default=0)
    Permission=models.CharField(max_length=100,blank=True)
    Organization=models.CharField(max_length=100,blank=True)
    Faculty_Incharge=models.CharField(max_length=100,blank=True)
    Student_Incharge=models.CharField(max_length=100,blank=True)
    Participations=models.CharField(max_length=1000,blank=True)
    PO=models.CharField(max_length=100,blank=True)
    Rules=models.CharField(max_length=500,blank=True)
    Description=models.CharField(max_length=500,blank=True)
    FeedBack=models.CharField(max_length=1000,blank=True)
    Report=models.CharField(max_length=50,blank=True)
    Poster=models.CharField(max_length=50,blank=True)
