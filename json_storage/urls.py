from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('add/', views.addData, name='add_file'),
    path('get/all/', views.get_all, name='get_all'),
    path('delete/<int:file_id>', views.delete, name='delete')
]
