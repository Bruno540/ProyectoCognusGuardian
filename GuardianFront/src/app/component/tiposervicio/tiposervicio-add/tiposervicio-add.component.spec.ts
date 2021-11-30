import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposervicioAddComponent } from './tiposervicio-add.component';

describe('TiposervicioAddComponent', () => {
  let component: TiposervicioAddComponent;
  let fixture: ComponentFixture<TiposervicioAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposervicioAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposervicioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
