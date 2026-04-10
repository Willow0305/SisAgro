from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Informante, Estabelecimento, Item, Questionario, Pesquisa, Produto
from .serializers import (
    InformanteSerializer, EstabelecimentoSerializer,
    ItemSerializer, QuestionarioSerializer,
    PesquisaSerializer, ProdutoSerializer,
)


class InformanteView(APIView):
    def get(self, request):
        informantes = Informante.objects.all()
        serializer = InformanteSerializer(informantes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = InformanteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class EstabelecimentoView(APIView):
    def get(self, request):
        estabelecimentos = Estabelecimento.objects.all()
        serializer = EstabelecimentoSerializer(estabelecimentos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EstabelecimentoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class ItemView(APIView):
    def get(self, request):
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class QuestionarioView(APIView):
    def get(self, request):
        questionarios = Questionario.objects.all()
        serializer = QuestionarioSerializer(questionarios, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = QuestionarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


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
