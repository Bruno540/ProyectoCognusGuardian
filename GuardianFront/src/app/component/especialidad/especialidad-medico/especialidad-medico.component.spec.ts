import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadMedicoComponent } from './especialidad-medico.component';

describe('EspecialidadMedicoComponent', () => {
  let component: EspecialidadMedicoComponent;
  let fixture: ComponentFixture<EspecialidadMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecialidadMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
