from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from .models import JsonData
from django.views.decorators.csrf import csrf_exempt
import datetime
from pytz import timezone


def index(request):
    new_json_obj = JsonData()
    return HttpResponse("Hello, world. You're at the json index.")


@csrf_exempt
def addData(request):
    print(request.POST)
    num = len(JsonData.objects.all())
    new_data = JsonData(json_content=request.POST['data'], name=num)

    resp = HttpResponse(status=200)
    # resp["Access-Control-Allow-Origin"] = "*"
    # resp["Access-Control-Allow-Headers"] = "Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, " \
    #                                        "X-Requested-With, Content-Type, Access-Control-Request-Method, " \
    #                                        "Access-Control-Request-Headers "
    return resp


def get_all():
    return JsonData.objects.all()