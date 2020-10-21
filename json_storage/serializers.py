from rest_framework import serializers
from .models import JsonData


class JsonDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = JsonData
        fields = ['json_content', 'name', 'date_of_creation']

    # def get_vuew(self):
    #     return

    # def get_viewed_by_user(self, instance):
    #     user = self.context['request']. user
    #     return instance.view_set.filter(viewer=user).exists()