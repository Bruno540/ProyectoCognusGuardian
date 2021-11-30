import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
<<<<<<< HEAD:GuardianFront/src/app/component/medico/medico-add/medico-add.component.spec.ts
=======
>>>>>>> origin/Pablo
import { MedicoAddComponent } from './medico-add.component';

describe('MedicoAddComponent', () => {
  let component: MedicoAddComponent;
  let fixture: ComponentFixture<MedicoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicoAddComponent ]
<<<<<<< HEAD
=======
import { ZonaAddComponent } from './zona-add.component';

describe('ZonaAddComponent', () => {
  let component: ZonaAddComponent;
  let fixture: ComponentFixture<ZonaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonaAddComponent ]
>>>>>>> origin/Pablo:GuardianFront/src/app/component/zona/zona-add/zona-add.component.spec.ts
=======
>>>>>>> origin/Pablo
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD
<<<<<<< HEAD:GuardianFront/src/app/component/medico/medico-add/medico-add.component.spec.ts
    fixture = TestBed.createComponent(MedicoAddComponent);
=======
    fixture = TestBed.createComponent(ZonaAddComponent);
>>>>>>> origin/Pablo:GuardianFront/src/app/component/zona/zona-add/zona-add.component.spec.ts
=======
    fixture = TestBed.createComponent(MedicoAddComponent);
>>>>>>> origin/Pablo
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
