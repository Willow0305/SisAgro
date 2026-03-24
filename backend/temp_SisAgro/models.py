from django.db import models

class Informante(models.Model):
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    telefone = models.CharField(max_length=15)

class Estabelecimento(models.Model):
    nome = models.CharField(max_length=255)
    endereco = models.TextField()
    informante = models.ForeignKey(Informante, on_delete=models.CASCADE)

class Item(models.Model):
    nome = models.CharField(max_length=255)
    descricao = models.TextField()

class Questionario(models.Model):
    titulo = models.CharField(max_length=255)
    descricao = models.TextField()
    itens = models.ManyToManyField(Item)