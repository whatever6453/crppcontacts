from crppcontacts.models import Contact, Tag
from rest_framework import serializers

class ContactSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Contact
        fields = ( '__all__' )

class TagSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Tag
        fields = ( '__all__' )
