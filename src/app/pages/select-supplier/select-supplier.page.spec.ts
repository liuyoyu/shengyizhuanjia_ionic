import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSupplierPage } from './select-supplier.page';

describe('SelectSupplierPage', () => {
  let component: SelectSupplierPage;
  let fixture: ComponentFixture<SelectSupplierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSupplierPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSupplierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
