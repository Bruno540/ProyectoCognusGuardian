import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSuscriptionComponent } from './success-suscription.component';

describe('SuccessSuscriptionComponent', () => {
  let component: SuccessSuscriptionComponent;
  let fixture: ComponentFixture<SuccessSuscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessSuscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessSuscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
