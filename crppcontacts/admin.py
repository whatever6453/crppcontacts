from django.contrib import admin

import crppcontacts.models



class TagAdmin(admin.ModelAdmin):
    list_filter = ('name',)


admin.site.register(crppcontacts.models.Tag, TagAdmin)


class ContactAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'organization', 'email1', 'telephone', 'mobile1')
    list_filter = ('tags', 'organization', 'first_name', 'last_name')
    fieldsets = (
        (None, {
            'fields': ('name', 'first_name', 'last_name', 'organization', 'department', 'position', 'telephone',
                       'mobile1', 'mobile2', 'email1', 'email2', 'website','tags')
        }),
        ('Address', {
            'classes': ('collapse',),
            'fields': ('state', 'country', 'city', 'street', 'zip_code')
        }),
    )


admin.site.register(crppcontacts.models.Contact, ContactAdmin)