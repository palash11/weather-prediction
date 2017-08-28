from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns
# from django.views.generic import Redirectview
from companies import views

urlpatterns = [
    url(r'^$', views.url_redirect, name="url-redirect"),
    url(r'^weather/', views.view, name = 'index'),
    url(r'^admin/', admin.site.urls),
    url(r'^mplot/(\d{4}-\d{2}-\d+)/$', views.seven, name = 'seven'),
    url(r'^madridplot/(\d{4}-\d{2}-\d+)/$', views.max, name = 'seven_max'),
    url(r'^plot/(\d{4}-\d{2}-\d+)/$', views.prin, name = 'plot'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
