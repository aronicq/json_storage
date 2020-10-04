from django.db import models


class JsonData(models.Model):
    json_content = models.TextField()
    name = models.CharField(max_length=30)
    date_of_creation = models.DateField(auto_now_add=True)
# id added automatically
