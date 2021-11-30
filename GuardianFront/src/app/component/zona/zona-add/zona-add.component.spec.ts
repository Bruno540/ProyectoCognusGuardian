import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
<<<<<<< HEAD:GuardianFront/src/app/component/zona/zona-add/zona-add.component.spec.ts
=======
>>>>>>> origin/Pablo
import { ZonaAddComponent } from './zona-add.component';

describe('ZonaAddComponent', () => {
  let component: ZonaAddComponent;
  let fixture: ComponentFixture<ZonaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonaAddComponent ]
<<<<<<< HEAD
=======
import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorComponent ]
>>>>>>> origin/Pablo:GuardianFront/src/app/component/error/error.component.spec.ts
=======
>>>>>>> origin/Pablo
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD
<<<<<<< HEAD:GuardianFront/src/app/component/zona/zona-add/zona-add.component.spec.ts
    fixture = TestBed.createComponent(ZonaAddComponent);
=======
    fixture = TestBed.createComponent(ErrorComponent);
>>>>>>> origin/Pablo:GuardianFront/src/app/component/error/error.component.spec.ts
=======
    fixture = TestBed.createComponent(ZonaAddComponent);
>>>>>>> origin/Pablo
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
