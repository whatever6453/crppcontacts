from django.http import HttpResponse
from rest_framework import viewsets
from crppcontacts.models import Contact, Tag
from crppcontacts.serializers import ContactSerializer, TagSerializer

def index(request):
    return HttpResponse("TEST CONTACTS APP.")


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
