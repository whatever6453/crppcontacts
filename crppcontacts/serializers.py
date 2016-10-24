from crppcontacts.models import Contact, Tag
from rest_framework import serializers

class ContactSerializer(serializers.HyperlinkedModelSerializer):
    tags = serializers.HyperlinkedRelatedField(
        many=True, view_name='tag-detail', read_only=False,
        queryset=Tag.objects.all()
    )

    class Meta:
        model = Contact
        fields = ( '__all__' )

class TagSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Tag
        fields = ( '__all__' )
