from django.db import models

class Implant(models.Model):
    name = models.CharField(max_length=500)
    category = models.CharField(max_length=500)
    country = models.CharField(max_length=100)
    rated_power = models.IntegerField()
    num_unita_presenti = models.IntegerField()
    num_unita_operativi = models.IntegerField(default=0)
    operability = models.BooleanField()
    availability = models.BooleanField()
    dateLastUpdate = models.IntegerField()