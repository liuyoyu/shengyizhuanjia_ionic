import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryNamePage } from './edit-category-name.page';

describe('EditCategoryNamePage', () => {
  let component: EditCategoryNamePage;
  let fixture: ComponentFixture<EditCategoryNamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCategoryNamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
