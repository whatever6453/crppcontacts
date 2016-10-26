from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework import routers
from crppcontacts import views

base_url = 'v1'
router = routers.SimpleRouter(trailing_slash=False)
router.register(base_url + r'/contacts(/)?', views.ContactViewSet)
router.register(base_url + r'/tags(/)?', views.TagViewSet)

urlpatterns = patterns('',
    url(r'^', include(router.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^index/', 'crppcontacts.views.index', name='index')
)
