import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisguardiasComponent } from './misguardias.component';

describe('MisguardiasComponent', () => {
  let component: MisguardiasComponent;
  let fixture: ComponentFixture<MisguardiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisguardiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisguardiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
