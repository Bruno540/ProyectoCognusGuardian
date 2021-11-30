import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposervicioListComponent } from './tiposervicio-list.component';

describe('TiposervicioListComponent', () => {
  let component: TiposervicioListComponent;
  let fixture: ComponentFixture<TiposervicioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposervicioListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposervicioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
