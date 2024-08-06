from django.db import models

class Event(models.Model):
    EventName=models.CharField(max_length=100)
    EventID=models.IntegerField()

    def __str__(self):
        self.EventName

