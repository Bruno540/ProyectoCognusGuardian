import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaListComponent } from './zona-list..component';

describe('ZonaListComponent', () => {
  let component: ZonaListComponent;
  let fixture: ComponentFixture<ZonaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
