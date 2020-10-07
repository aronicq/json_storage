from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('add/', views.addData, name='add_file'),
    path('view/all/', views.get_all, name='get_all')
]
