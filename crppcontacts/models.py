# from django.db import models
import django.db.models


class Common(django.db.models.Model):
    """
    Abstract class for common attributes and behaviour
    """
    class Meta:
        abstract = True


class Tag(Common):
    """
    Represents a TAG to categorize contacts
    """
    name = django.db.models.CharField('Tag name', max_length=50, null=False, blank=False)
    def __unicode__(self):  # Python 3: def __str__(self):
        return self.name


class Contact(Common):
    """
    Represents a contact
    """
    first_name = django.db.models.CharField('First name', max_length=50, null=True, blank=True)
    last_name = django.db.models.CharField('Last name', max_length=100, null=True, blank=True)
    organization = django.db.models.CharField('Organization', max_length=200, null=True, blank=True)
    position = django.db.models.CharField('Position', max_length=200, null=True, blank=True)
    department = django.db.models.CharField('Department', max_length=200, null=True, blank=True)
    email1 = django.db.models.EmailField('Email', max_length=250, null=True, unique=False, blank=True)
    email2 = django.db.models.EmailField('Alternate email', max_length=250, null=True, unique=False, blank=True)
    telephone = django.db.models.CharField('Telephone', max_length=50, null=True, blank=True)
    mobile1 = django.db.models.CharField('Mobile phone', max_length=50, null=True, blank=True)
    mobile2 = django.db.models.CharField('Alternate mobile phone', max_length=50, null=True, blank=True)
    country = django.db.models.CharField('Country', max_length=50, null=True, blank=True)
    state = django.db.models.CharField('State', max_length=50, null=True, blank=True)
    city = django.db.models.CharField('City', max_length=50, null=True, blank=True)
    street = django.db.models.CharField('Street address', max_length=200, null=True, blank=True)
    zip_code = django.db.models.CharField('Zip code', max_length=50, null=True, blank=True)
    website = django.db.models.CharField('Web site URL', max_length=200, null=True, blank=True)
    tags = django.db.models.ManyToManyField(Tag)
    def __unicode__(self):  # Python 3: def __str__(self):
        return self.first_name + ' ' + self.last_name
