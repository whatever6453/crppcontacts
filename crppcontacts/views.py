from rest_framework import viewsets
from crppcontacts.models import Contact, Tag
from crppcontacts.serializers import ContactSerializer, TagSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
