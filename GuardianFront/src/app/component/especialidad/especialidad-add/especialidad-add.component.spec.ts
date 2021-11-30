import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadAddComponent } from './especialidad-add.component';

describe('EspecialidadAddComponent', () => {
  let component: EspecialidadAddComponent;
  let fixture: ComponentFixture<EspecialidadAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecialidadAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
