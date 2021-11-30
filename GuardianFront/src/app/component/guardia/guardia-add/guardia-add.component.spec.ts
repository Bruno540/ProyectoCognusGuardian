import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardiaAddComponent } from './guardia-add.component';

describe('GuardiaAddComponent', () => {
  let component: GuardiaAddComponent;
  let fixture: ComponentFixture<GuardiaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardiaAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardiaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
