import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ModalPesquisaComponent } from './modal-pesquisa.component';
import { PesquisaService } from '../../../services/pesquisa';

describe('ModalPesquisaComponent', () => {
  let component: ModalPesquisaComponent;
  let fixture: ComponentFixture<ModalPesquisaComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPesquisaComponent, HttpClientTestingModule],
      providers: [PesquisaService]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPesquisaComponent);
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

  it('should load pesquisas on init', () => {
    const mockPesquisas = [
      { id: 1, nome: 'LSPA/PAM', data_criacao: '2024-01-01T00:00:00Z' }
    ];

    const req = httpMock.expectOne('http://localhost:8000/api/pesquisas/');
    expect(req.request.method).toBe('GET');
    req.flush(mockPesquisas);

    expect(component.pesquisasList.length).toBe(1);
  });

  it('should emit fecharModal event', () => {
    spyOn(component.fecharModal, 'emit');
    component.fechar();
    expect(component.fecharModal.emit).toHaveBeenCalled();
  });
});
