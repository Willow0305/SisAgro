from django.core.management.base import BaseCommand
from core.models import Pesquisa

class Command(BaseCommand):
    help = 'Cria as pesquisas padrão do sistema'

    def handle(self, *args, **options):
        pesquisas_padrao = [
            'LSPA/PAM',
            'PPM',
            'PEVS'
        ]
        
        for nome in pesquisas_padrao:
            pesquisa, criada = Pesquisa.objects.get_or_create(nome=nome)
            if criada:
                self.stdout.write(
                    self.style.SUCCESS(f'✓ Pesquisa "{nome}" criada com sucesso')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'⊘ Pesquisa "{nome}" já existe')
                )
