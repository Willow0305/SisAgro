from rest_framework import serializers
from .models import Pesquisa, Produto

class ProdutoSerializer(serializers.ModelSerializer):
    pesquisa_nome = serializers.CharField(source='pesquisa.nome', read_only=True)
    
    class Meta:
        model = Produto
        fields = ['id', 'nome', 'pesquisa', 'pesquisa_nome', 'data_criacao']
        read_only_fields = ['id', 'data_criacao']

class PesquisaSerializer(serializers.ModelSerializer):
    produtos = ProdutoSerializer(many=True, read_only=True)
    
    class Meta:
        model = Pesquisa
        fields = ['id', 'nome', 'data_criacao', 'produtos']
        read_only_fields = ['id', 'data_criacao']
    
    def validate_nome(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError('Nome da pesquisa não pode ser vazio')
        return value.strip()
    
    def validate(self, data):
        nome = data.get('nome', '').strip()
        qs = Pesquisa.objects.filter(nome__iexact=nome)
        # Se for update, ignora o próprio registro
        if self.instance:
            qs = qs.exclude(id=self.instance.id)
        if qs.exists():
            raise serializers.ValidationError({'nome': 'Pesquisa com este nome já existe'})
        return data
