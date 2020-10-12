/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CancelaContratoComponent } from './cancela-contrato.component';

describe('CancelaContratoComponent', () => {
  let component: CancelaContratoComponent;
  let fixture: ComponentFixture<CancelaContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelaContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelaContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
