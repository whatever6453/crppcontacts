from crppcontacts.models import Contact, Tag
from rest_framework import serializers

class ContactSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Contact

class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
