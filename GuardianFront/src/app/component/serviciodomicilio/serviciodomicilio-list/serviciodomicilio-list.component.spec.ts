import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciodomicilioListComponent } from './serviciodomicilio-list.component';

describe('ServiciodomicilioListComponent', () => {
  let component: ServiciodomicilioListComponent;
  let fixture: ComponentFixture<ServiciodomicilioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciodomicilioListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciodomicilioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
