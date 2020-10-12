/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CancelaCessaoComponent } from './cancela-cessao.component';

describe('CancelaCessaoComponent', () => {
  let component: CancelaCessaoComponent;
  let fixture: ComponentFixture<CancelaCessaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelaCessaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelaCessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
