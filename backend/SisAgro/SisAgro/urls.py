"""
URL configuration for SisAgro project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InformanteView, EstabelecimentoView, ItemView, QuestionarioView
from core.views import PesquisaViewSet, ProdutoViewSet

router = DefaultRouter()
router.register(r'pesquisas', PesquisaViewSet)
router.register(r'produtos', ProdutoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('informantes/', InformanteView.as_view(), name='informantes'),
    path('estabelecimentos/', EstabelecimentoView.as_view(), name='estabelecimentos'),
    path('itens/', ItemView.as_view(), name='itens'),
    path('questionarios/', QuestionarioView.as_view(), name='questionarios'),
]
