# Generated by Django 5.1 on 2024-08-15 03:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Event', '0003_rename_organization_event_association_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='Department',
            field=models.JSONField(blank=True, default=dict),
        ),
    ]
