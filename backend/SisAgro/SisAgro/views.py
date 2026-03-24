from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Informante, Estabelecimento, Item, Questionario
from .serializers import InformanteSerializer, EstabelecimentoSerializer, ItemSerializer, QuestionarioSerializer

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