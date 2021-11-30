import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TopMedicosComponent } from './top-medicos.component';

describe('TopSellingComponent', () => {
  let component: TopMedicosComponent;
  let fixture: ComponentFixture<TopMedicosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TopMedicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
