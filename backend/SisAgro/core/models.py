from django.db import models

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
