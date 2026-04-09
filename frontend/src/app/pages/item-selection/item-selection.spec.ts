import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ItemSelectionComponent } from './item-selection.component';
import { PesquisaService } from '../../services/pesquisa.service';
import { of, throwError } from 'rxjs';

// Mock data
const mockPesquisas = [
  {
    id: 1,
    nome: 'Pesquisa Teste',
    descricao: 'Descrição teste',
    dataInicio: new Date(),
    dataFim: new Date()
  }
];

describe('ItemSelectionComponent', () => {
  let component: ItemSelectionComponent;
  let fixture: ComponentFixture<ItemSelectionComponent>;
  let pesquisaService: PesquisaService;

  // Mock do serviço
  const mockPesquisaService = {
    getPesquisas: jasmine.createSpy('getPesquisas').and.returnValue(of(mockPesquisas))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSelectionComponent],
      providers: [
        { provide: PesquisaService, useValue: mockPesquisaService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemSelectionComponent);
    component = fixture.componentInstance;
    pesquisaService = TestBed.inject(PesquisaService);
  });

  it('deve carregar as pesquisas ao iniciar', fakeAsync(() => {
    // Dispara o ngOnInit
    fixture.detectChanges();
    tick();

    // Verifica se o getPesquisas foi chamado
    expect(pesquisaService.getPesquisas).toHaveBeenCalled();

    // Verifica se as pesquisas foram carregadas
    expect(component.pesquisasList.length).toBe(1);
    expect(component.pesquisasList[0].nome).toBe('Pesquisa Teste');
    expect(component.carregandoPesquisas).toBe(false);
  }));

  it('deve definir carregandoPesquisas como false após carregar', fakeAsync(() => {
    expect(component.carregandoPesquisas).toBe(true);

    fixture.detectChanges();
    tick();

    expect(component.carregandoPesquisas).toBe(false);
  }));

  it('deve lidar com erros ao carregar pesquisas', fakeAsync(() => {
    const errorMessage = 'Erro ao carregar pesquisas';
    (pesquisaService.getPesquisas as jasmine.Spy).and.returnValue(
      throwError(() => new Error(errorMessage))
    );

    fixture.detectChanges();
    tick();

    expect(component.pesquisasList.length).toBe(0);
    expect(component.carregandoPesquisas).toBe(false);
  }));
});