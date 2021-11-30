import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdificioAddComponent } from './edificio-add.component';

describe('EdificioAddComponent', () => {
  let component: EdificioAddComponent;
  let fixture: ComponentFixture<EdificioAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdificioAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdificioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
