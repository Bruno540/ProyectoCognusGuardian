import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardiaListComponent } from './guardia-list.component';

describe('GuardiaListComponent', () => {
  let component: GuardiaListComponent;
  let fixture: ComponentFixture<GuardiaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardiaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardiaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
