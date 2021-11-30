import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarguardiaComponent } from './asignarguardia.component';

describe('AsignarguardiaComponent', () => {
  let component: AsignarguardiaComponent;
  let fixture: ComponentFixture<AsignarguardiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarguardiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarguardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
