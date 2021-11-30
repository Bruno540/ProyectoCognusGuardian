import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HorariosFavoritosComponent } from './horarios-favoritos.component';

describe('SalesSummaryComponent', () => {
  let component: HorariosFavoritosComponent;
  let fixture: ComponentFixture<HorariosFavoritosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HorariosFavoritosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorariosFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
