import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativoAddComponent } from './administrativo-add.component';

describe('AdministrativoAbmComponent', () => {
  let component: AdministrativoAddComponent;
  let fixture: ComponentFixture<AdministrativoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrativoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
