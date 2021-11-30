import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativoListComponent } from './administrativo-list.component';

describe('AdministrativoListComponent', () => {
  let component: AdministrativoListComponent;
  let fixture: ComponentFixture<AdministrativoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrativoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
