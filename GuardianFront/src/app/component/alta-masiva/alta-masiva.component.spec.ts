import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaMasivaComponent } from './alta-masiva.component';

describe('AltaMasivaComponent', () => {
  let component: AltaMasivaComponent;
  let fixture: ComponentFixture<AltaMasivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaMasivaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaMasivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
