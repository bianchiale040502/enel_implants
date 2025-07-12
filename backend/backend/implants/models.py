from django.db import models

class Implant(models.Model):
    implant_name = models.CharField(max_length=500)
    category = models.CharField(max_length=500)
    country = models.CharField(max_length=100)
    rated_power = models.DecimalField(default=0, max_digits=19, decimal_places=10)
    num_unita_presenti = models.IntegerField(default=1)
    num_unita_operativi = models.IntegerField(default=0)
    operability = models.BooleanField()
    availability = models.BooleanField()
    dateLastUpdate = models.IntegerField(default=0)