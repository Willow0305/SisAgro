import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ModalProdutoComponent } from './modal-produto.component';
import { PesquisaService } from '../../../services/pesquisa';
import { ProdutoService } from '../../../services/produto';

describe('ModalProdutoComponent', () => {
  let component: ModalProdutoComponent;
  let fixture: ComponentFixture<ModalProdutoComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalProdutoComponent, HttpClientTestingModule],
      providers: [PesquisaService, ProdutoService]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalProdutoComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pesquisas and produtos on init', () => {
    const mockPesquisas = [
      { id: 1, nome: 'LSPA/PAM', data_criacao: '2024-01-01T00:00:00Z' }
    ];
    const mockProdutos = [];

    const pesquisasReq = httpMock.expectOne('http://localhost:8000/api/pesquisas/');
    pesquisasReq.flush(mockPesquisas);

    const produtosReq = httpMock.expectOne('http://localhost:8000/api/produtos/');
    produtosReq.flush(mockProdutos);

    expect(component.pesquisasList.length).toBe(1);
  });

  it('should emit fecharModal event', () => {
    spyOn(component.fecharModal, 'emit');
    component.fechar();
    expect(component.fecharModal.emit).toHaveBeenCalled();
  });
});
