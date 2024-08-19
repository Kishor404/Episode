from django.db import models

# Create your models here.
class Event(models.Model):
    Name=models.CharField(max_length=100)
    Venue=models.CharField(max_length=100,blank=True)
    Date=models.CharField(max_length=100,blank=True)
    Time=models.CharField(max_length=100,blank=True)
    Status=models.IntegerField(default=0)
    Permission=models.JSONField(default=dict)
    Association=models.CharField(max_length=100,blank=True)
    Faculty_Incharge=models.JSONField(default=dict)
    Student_Incharge=models.JSONField(default=dict)
    Participations=models.JSONField(default=dict)
    PO=models.JSONField(default=dict)
    Rules=models.CharField(max_length=500,blank=True)
    Resource_Person=models.CharField(max_length=100,blank=True)
    Description=models.CharField(max_length=500,blank=True)
    FeedBack=models.JSONField(default=dict)
    Report=models.CharField(max_length=50,blank=True)
    Poster=models.CharField(max_length=50,blank=True)
    Department=models.JSONField(default=dict,blank=True)
