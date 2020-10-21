from django.http import HttpResponse, HttpRequest
from .models import JsonData
from django.template import loader
from django.core import serializers
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def addData(request):
    print(request.POST)

    if request.POST.get('name'):
        name = request.POST.get('name')
        new_data = JsonData(json_content=request.POST['json'], name=name)
        new_data.save()
    else:
        name = "temp name " + str(len(JsonData.objects.all()))
        new_data = JsonData(json_content=request.POST['json'], name=name)
        new_data.save()
        JsonData.objects.filter(id=new_data.id).update(name=new_data.id)


    resp = HttpResponse(status=200)
    resp["Access-Control-Allow-Origin"] = 'localhost:8081, localhost:8080, http://0.0.0.0:8000, ' \
                                          'http://localhost:8000/json_storage/add/ '
    resp["Access-Control-Allow-Headers"] = 'Origin'
    resp["Access-Control-Allow-Credentials"] = 'true'
    return resp


def get_all(request):
    serializer = serializers.serialize('json', JsonData.objects.all())
    print(serializer)
    resp = HttpResponse(serializer)
    resp["Access-Control-Allow-Origin"] = 'http://localhost:8081'
    resp["Access-Control-Allow-Headers"] = 'Origin'
    resp["Access-Control-Allow-Credentials"] = 'true'
    return resp


# @ensure_csrf_cookie
def delete(request, file_id):
    found = JsonData.objects.filter(id=file_id).first()
    JsonData.delete(found)
    return HttpResponse(status=200)


@ensure_csrf_cookie
def index(request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render())
