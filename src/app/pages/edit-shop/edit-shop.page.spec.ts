import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShopPage } from './edit-shop.page';

describe('EditShopPage', () => {
  let component: EditShopPage;
  let fixture: ComponentFixture<EditShopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShopPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
