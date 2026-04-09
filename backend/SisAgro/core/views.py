from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Pesquisa, Produto
from .serializers import PesquisaSerializer, ProdutoSerializer

class PesquisaViewSet(viewsets.ModelViewSet):
    queryset = Pesquisa.objects.prefetch_related('produtos').all()
    serializer_class = PesquisaSerializer

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.select_related('pesquisa').all()
    serializer_class = ProdutoSerializer
    
    @action(detail=False, methods=['get'])
    def por_pesquisa(self, request):
        pesquisa_id = request.query_params.get('pesquisa_id')
        if pesquisa_id:
            produtos = Produto.objects.filter(pesquisa_id=pesquisa_id)
            serializer = self.get_serializer(produtos, many=True)
            return Response(serializer.data)
        return Response(
            {'error': 'pesquisa_id is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
