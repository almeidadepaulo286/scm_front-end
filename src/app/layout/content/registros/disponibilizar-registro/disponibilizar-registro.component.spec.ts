import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilizarRegistroComponent } from './disponibilizar-registro.component';

describe('DisponibilizarRegistroComponent', () => {
  let component: DisponibilizarRegistroComponent;
  let fixture: ComponentFixture<DisponibilizarRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisponibilizarRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibilizarRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
