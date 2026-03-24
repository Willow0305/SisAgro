from rest_framework import serializers
from .models import Informante, Estabelecimento, Item, Questionario

class InformanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Informante
        fields = '__all__'

class EstabelecimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estabelecimento
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class QuestionarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionario
        fields = '__all__'