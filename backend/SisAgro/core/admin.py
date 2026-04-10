from django.contrib import admin
from .models import Informante, Estabelecimento, Item, Questionario, Pesquisa, Produto


@admin.register(Informante)
class InformanteAdmin(admin.ModelAdmin):
    list_display = ['id', 'nome', 'email', 'telefone']
    search_fields = ['nome', 'email']


@admin.register(Estabelecimento)
class EstabelecimentoAdmin(admin.ModelAdmin):
    list_display = ['id', 'nome', 'informante']
    search_fields = ['nome']
    list_filter = ['informante']


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'nome']
    search_fields = ['nome']


@admin.register(Questionario)
class QuestionarioAdmin(admin.ModelAdmin):
    list_display = ['id', 'titulo']
    search_fields = ['titulo']


@admin.register(Pesquisa)
class PesquisaAdmin(admin.ModelAdmin):
    list_display = ['id', 'nome', 'data_criacao']
    search_fields = ['nome']
    ordering = ['-data_criacao']


@admin.register(Produto)
class ProdutoAdmin(admin.ModelAdmin):
    list_display = ['id', 'nome', 'pesquisa', 'data_criacao']
    search_fields = ['nome', 'pesquisa__nome']
    list_filter = ['pesquisa']
    ordering = ['-data_criacao']

