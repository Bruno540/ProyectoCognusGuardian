import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioAddComponent } from './servicio-add.component';

describe('ServicioAddComponent', () => {
  let component: ServicioAddComponent;
  let fixture: ComponentFixture<ServicioAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
