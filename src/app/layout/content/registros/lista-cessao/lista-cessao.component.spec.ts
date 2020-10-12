import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCessaoComponent } from './lista-cessao.component';

describe('ListaCessaoComponent', () => {
  let component: ListaCessaoComponent;
  let fixture: ComponentFixture<ListaCessaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCessaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
