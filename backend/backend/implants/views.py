from django.shortcuts import render
from .models import Implant
from rest_framework import routers, serializers, viewsets

class ImplantSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Implant
        fields = [
            'id',
            'name',
            'category',
            'country',
            'rated_power',
            'num_unita_presenti',
            'num_unita_operativi',
            'operability',
            'availability',
            'dateLastUpdate'
        ]

class ImplantViewSet(viewsets.ModelViewSet):
    queryset = Implant.objects.all()
    serializer_class = ImplantSerializer
