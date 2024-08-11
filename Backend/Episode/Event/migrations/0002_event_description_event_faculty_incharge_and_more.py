# Generated by Django 5.1 on 2024-08-10 12:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Event', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='Description',
            field=models.CharField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name='event',
            name='Faculty_Incharge',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='event',
            name='FeedBack',
            field=models.CharField(blank=True, max_length=1000),
        ),
        migrations.AddField(
            model_name='event',
            name='Organization',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='event',
            name='PO',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='event',
            name='Participations',
            field=models.CharField(blank=True, max_length=1000),
        ),
        migrations.AddField(
            model_name='event',
            name='Permission',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='event',
            name='Poster',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name='event',
            name='Report',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name='event',
            name='Rules',
            field=models.CharField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name='event',
            name='Status',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='event',
            name='Student_Incharge',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='event',
            name='Venue',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
