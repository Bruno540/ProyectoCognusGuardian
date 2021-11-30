import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdificioListComponent } from './edificio-list.component';

describe('EdificioListComponent', () => {
  let component: EdificioListComponent;
  let fixture: ComponentFixture<EdificioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdificioListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdificioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
