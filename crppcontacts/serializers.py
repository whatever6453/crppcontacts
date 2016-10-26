from crppcontacts.models import Contact, Tag
from rest_framework import serializers


class ContactSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(
        required=False,
        many=True,
        slug_field='name',
        allow_null=True,
        read_only=False,
        queryset=Tag.objects.all()
    )

    class Meta:
        model = Contact
        fields = ( '__all__' )


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ( '__all__' )
