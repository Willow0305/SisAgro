from django.db import models


class Informante(models.Model):
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    telefone = models.CharField(max_length=15)

    def __str__(self):
        return self.nome


class Estabelecimento(models.Model):
    nome = models.CharField(max_length=255)
    endereco = models.TextField()
    informante = models.ForeignKey(Informante, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome


class Item(models.Model):
    nome = models.CharField(max_length=255)
    descricao = models.TextField()

    def __str__(self):
        return self.nome


class Questionario(models.Model):
    titulo = models.CharField(max_length=255)
    descricao = models.TextField()
    itens = models.ManyToManyField(Item)

    def __str__(self):
        return self.titulo


class Pesquisa(models.Model):
    nome = models.CharField(max_length=255, unique=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['data_criacao']
    
    def __str__(self):
        return self.nome


class Produto(models.Model):
    nome = models.CharField(max_length=255)
    pesquisa = models.ForeignKey(Pesquisa, on_delete=models.CASCADE, related_name='produtos')
    data_criacao = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['data_criacao']
        unique_together = ('nome', 'pesquisa')
    
    def __str__(self):
        return f"{self.nome} - {self.pesquisa.nome}"
