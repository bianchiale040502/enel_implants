from django.contrib.auth import authenticate
# from django.shortcuts import render
from .models import Implant
from rest_framework import routers, serializers, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import SAFE_METHODS, IsAuthenticatedOrReadOnly

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

class IsAdminGroupMember(IsAuthenticatedOrReadOnly):
    def has_permission(self, request, view):
        # Consentire la lettura (metodi sicuri: GET, HEAD, OPTIONS) a tutti, anche ai non autenticati
        if request.method in SAFE_METHODS:
            return True
        # Per le operazioni di scrittura (POST, PUT, PATCH, DELETE), solo gli Admin autenticati
        return request.user and request.user.is_authenticated and request.user.groups.filter(name='Admins').exists()

class ImplantViewSet(viewsets.ModelViewSet):
    queryset = Implant.objects.all()
    serializer_class = ImplantSerializer
    permission_classes = [IsAdminGroupMember]

class LoginView(APIView):

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        group_name = 'Admins'

        user = authenticate(username=username, password=password)

        if user is not None:
            if user.groups.filter(name=group_name).exists():
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'token': token.key,
                    'username': user.username
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Errore durante il login. Riprova più tardi.'}, status=status.HTTP_403_FORBIDDEN)
        return Response({'error': 'Utente non trovato'}, status=status.HTTP_401_UNAUTHORIZED)
