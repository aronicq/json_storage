from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from .models import JsonData
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
import datetime
from pytz import timezone
import corsheaders
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def addData(request):
    print(request.POST)
    name = request.POST.get('name') if request.POST.get('name') else len(JsonData.objects.all())
    new_data = JsonData(json_content=request.POST['json'], name=name)
    new_data.save()

    resp = HttpResponse(status=200)
    resp["Access-Control-Allow-Origin"] = 'http://0.0.0.0:8000'
    return resp


def get_all(request):
    return HttpResponse(JsonData.objects.all())


def delete(request, name):
    found = JsonData.objects.filter(name=name).first()
    JsonData.delete(found)
    return HttpResponse(status=200)


# @ensure_csrf_cookie
def index(request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render())