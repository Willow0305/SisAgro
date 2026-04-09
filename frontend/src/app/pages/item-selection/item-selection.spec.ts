import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ItemSelectionComponent } from './item-selection.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

// Mock data
const mockPesquisas = [
  {
    id: 1,
    nome: 'Pesquisa Teste',
    data_criacao: '2026-01-01T00:00:00Z',
    produtos: [
      { id: 1, nome: 'Produto Teste', pesquisa: 1, data_criacao: '2026-01-01T00:00:00Z' }
    ]
  }
];

describe('ItemSelectionComponent', () => {
  let component: ItemSelectionComponent;
  let fixture: ComponentFixture<ItemSelectionComponent>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSelectionComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemSelectionComponent);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('deve carregar as pesquisas ao iniciar', fakeAsync(() => {
    fixture.detectChanges();

    const req = httpTesting.expectOne(r => r.url.includes('/api/pesquisas/'));
    expect(req.request.method).toBe('GET');
    req.flush(mockPesquisas);
    tick();

    expect(component.pesquisasList.length).toBe(1);
    expect(component.pesquisasList[0].nome).toBe('Pesquisa Teste');
    expect(component.carregandoPesquisas).toBe(false);
  }));

  it('deve definir carregandoPesquisas como false após carregar', fakeAsync(() => {
    expect(component.carregandoPesquisas).toBe(true);

    fixture.detectChanges();

    const req = httpTesting.expectOne(r => r.url.includes('/api/pesquisas/'));
    req.flush(mockPesquisas);
    tick();

    expect(component.carregandoPesquisas).toBe(false);
  }));

  it('deve lidar com erros ao carregar pesquisas', fakeAsync(() => {
    fixture.detectChanges();

    const req = httpTesting.expectOne(r => r.url.includes('/api/pesquisas/'));
    req.flush('Erro', { status: 500, statusText: 'Server Error' });
    tick();

    expect(component.pesquisasList.length).toBe(0);
    expect(component.carregandoPesquisas).toBe(false);
    expect(component.erroCarregamento).toBeTruthy();
  }));

  afterEach(() => {
    httpTesting.verify();
  });
});