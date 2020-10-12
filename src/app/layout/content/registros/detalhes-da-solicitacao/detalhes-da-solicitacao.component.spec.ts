import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesDaSolicitacaoComponent } from './detalhes-da-solicitacao.component';

describe('DetalhesDaSolicitacaoComponent', () => {
  let component: DetalhesDaSolicitacaoComponent;
  let fixture: ComponentFixture<DetalhesDaSolicitacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesDaSolicitacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesDaSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
