import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSyncSuccessComponent } from './calendar-sync-success.component';

describe('CalendarSyncSuccessComponent', () => {
  let component: CalendarSyncSuccessComponent;
  let fixture: ComponentFixture<CalendarSyncSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarSyncSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarSyncSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
