from django.db import models

class Implant(models.Model):
    implant_name = models.CharField(max_length=500)
    category = models.CharField(max_length=500)
    country = models.CharField(max_length=100)
    rated_power = models.IntegerField(default=0)
    num_unita_presenti = models.IntegerField(default=0)
    num_unita_operativi = models.IntegerField(default=0)
    operability = models.BooleanField(default=0)
    availability = models.BooleanField(default=0)
    dateLastUpdate = models.IntegerField(default=0)