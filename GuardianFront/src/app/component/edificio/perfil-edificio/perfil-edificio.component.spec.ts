import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEdificioComponent } from './perfil-edificio.component';

describe('PerfilEdificioComponent', () => {
  let component: PerfilEdificioComponent;
  let fixture: ComponentFixture<PerfilEdificioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilEdificioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilEdificioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
