import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardiasdisponiblesComponent } from './guardiasdisponibles.component';

describe('GuardiasdisponiblesComponent', () => {
  let component: GuardiasdisponiblesComponent;
  let fixture: ComponentFixture<GuardiasdisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardiasdisponiblesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardiasdisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
