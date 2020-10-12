import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncluirSolicitacaoRegistroComponent } from './incluir-solicitacao-registro.component';

describe('IncluirSolicitacaoRegistroComponent', () => {
  let component: IncluirSolicitacaoRegistroComponent;
  let fixture: ComponentFixture<IncluirSolicitacaoRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncluirSolicitacaoRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncluirSolicitacaoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
