import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardiasCompletasComponent } from './guardias-completas.component';

describe('GuardiasCompletasComponent', () => {
  let component: GuardiasCompletasComponent;
  let fixture: ComponentFixture<GuardiasCompletasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardiasCompletasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardiasCompletasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
