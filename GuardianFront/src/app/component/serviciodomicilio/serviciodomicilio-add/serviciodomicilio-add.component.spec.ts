import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciodomicilioAddComponent } from './serviciodomicilio-add.component';

describe('ServiciodomicilioAddComponent', () => {
  let component: ServiciodomicilioAddComponent;
  let fixture: ComponentFixture<ServiciodomicilioAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciodomicilioAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciodomicilioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
