from django.shortcuts import render
from django.http import HttpResponse
from .models import JsonData


def index(request):
    new_json_obj = JsonData()
    return HttpResponse("Hello, world. You're at the json index.")


def addData():
    pass