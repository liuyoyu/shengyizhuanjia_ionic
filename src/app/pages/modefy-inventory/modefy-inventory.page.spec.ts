import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModefyInventoryPage } from './modefy-inventory.page';

describe('ModefyInventoryPage', () => {
  let component: ModefyInventoryPage;
  let fixture: ComponentFixture<ModefyInventoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModefyInventoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModefyInventoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
