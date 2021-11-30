import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionAddComponent } from './ubicacion-add.component';

describe('UbicacionAddComponent', () => {
  let component: UbicacionAddComponent;
  let fixture: ComponentFixture<UbicacionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbicacionAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
