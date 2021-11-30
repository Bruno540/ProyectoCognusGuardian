import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MispostulacionesComponent } from './mispostulaciones.component';

describe('MispostulacionesComponent', () => {
  let component: MispostulacionesComponent;
  let fixture: ComponentFixture<MispostulacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MispostulacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MispostulacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
