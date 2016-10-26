from django.db import models


class Common(models.Model):
    """
    Abstract class for common attributes and behaviour
    """
    class Meta:
        abstract = True


class Tag(Common):
    """
    Represents a TAG to categorize contacts
    """
    name = models.CharField('Tag name', max_length=50, null=False, blank=False)

    def __unicode__(self):  # Python 3: def __str__(self):
        return self.name


class Contact(Common):
    """
    Represents a contact
    """
    first_name = models.CharField('First name', max_length=50, null=True, blank=True)
    last_name = models.CharField('Last name', max_length=100, null=True, blank=True)
    organization = models.CharField('Organization', max_length=200, null=True, blank=True)
    position = models.CharField('Position', max_length=200, null=True, blank=True)
    department = models.CharField('Department', max_length=200, null=True, blank=True)
    email1 = models.EmailField('Email', max_length=250, null=True, unique=False, blank=True)
    email2 = models.EmailField('Alternate email', max_length=250, null=True, unique=False, blank=True)
    telephone = models.CharField('Telephone', max_length=50, null=True, blank=True)
    mobile1 = models.CharField('Mobile phone', max_length=50, null=True, blank=True)
    mobile2 = models.CharField('Alternate mobile phone', max_length=50, null=True, blank=True)
    country = models.CharField('Country', max_length=50, null=True, blank=True)
    state = models.CharField('State', max_length=50, null=True, blank=True)
    city = models.CharField('City', max_length=50, null=True, blank=True)
    street = models.CharField('Street address', max_length=200, null=True, blank=True)
    zip_code = models.CharField('Zip code', max_length=50, null=True, blank=True)
    website = models.CharField('Web site URL', max_length=200, null=True, blank=True)
    tags = models.ManyToManyField(Tag)

    def __unicode__(self):  # Python 3: def __str__(self):
        return self.first_name + ' ' + self.last_name
