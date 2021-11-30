import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventualidadComponent } from './eventualidad.component';

describe('EventualidadComponent', () => {
  let component: EventualidadComponent;
  let fixture: ComponentFixture<EventualidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventualidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventualidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
