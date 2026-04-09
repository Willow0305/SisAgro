from django.contrib import admin
from .models import Pesquisa, Produto

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

