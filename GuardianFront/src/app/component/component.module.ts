import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
import { CardsComponent } from './card/card.component';
import { SpinnerComponent } from '../shared/spinner.component';
import { DashboardComponent } from './guardia/dashboard/dashboard.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { EdificioAddComponent } from './edificio/edificio-add/edificio-add.component';
import { EspecialidadAddComponent } from './especialidad/especialidad-add/especialidad-add.component';
import { GuardiaAddComponent } from './guardia/guardia-add/guardia-add.component';
import { GuardiasdisponiblesComponent } from './datosmedico/guardiasdisponibles/guardiasdisponibles.component';
import { LoginComponent } from './account/login/login.component';
import { MisguardiasComponent } from './datosmedico/misguardias/misguardias.component';
import { PagoComponent } from './account/pago/pago.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { PerfilEdificioComponent } from './edificio/perfil-edificio/perfil-edificio.component';
import { PerfilMedicoComponent } from './medico/perfil-medico/perfil-medico.component';
import { AsignarguardiaComponent } from './guardia/asignarguardia/asignarguardia.component';
import { ServicioListComponent } from './servicio/servicio-list/servicio-list.component';
import { ServicioAddComponent } from './servicio/servicio-add/servicio-add.component';
import { ServiciodomicilioAddComponent } from './serviciodomicilio/serviciodomicilio-add/serviciodomicilio-add.component';
import { UbicacionAddComponent } from './ubicacion/ubicacion-add/ubicacion-add.component';
import { PerfilServicioComponent } from './servicio/perfil-servicio/perfil-servicio.component';
import { ZonaListComponent } from './zona/zona-list/zona-list..component';
import { ZonaAddComponent } from './zona/zona-add/zona-add.component';
import { EspecialidadMedicoComponent } from './especialidad/especialidad-medico/especialidad-medico.component';
import { MiPerfilComponent } from './datosmedico/mi-perfil/mi-perfil.component';
import { MispostulacionesComponent } from './datosmedico/mispostulaciones/mispostulaciones.component';
import { EventualidadComponent } from './datosmedico/eventualidad/eventualidad.component';
import { SuccessSuscriptionComponent } from './account/success-suscription/success-suscription.component';
import { PerfilAdministrativoComponent } from './administrativo/perfil-administrativo/perfil-administrativo.component';
import { ForgotpasswordComponent } from './account/forgotpassword/forgotpassword.component';
import { PasswordresetComponent } from './account/passwordreset/passwordreset.component';
import { AltaMasivaComponent } from './alta-masiva/alta-masiva.component';
import { AdministrativoAddComponent } from './administrativo/administrativo-add/administrativo-add.component';
import { AdministrativoListComponent } from './administrativo/administrativo-list/administrativo-list.component';
import { EdificioListComponent } from './edificio/edificio-list/edificio-list.component';
import { EspecialidadListComponent } from './especialidad/especialidad-list/especialidad-list.component';
import { GuardiaListComponent } from './guardia/guardia-list/guardia-list.component';
import { MedicoListComponent } from './medico/medico-list/medico-list.component';
import { MedicoAddComponent } from './medico/medico-add/medico-add.component';
import { ServiciodomicilioListComponent } from './serviciodomicilio/serviciodomicilio-list/serviciodomicilio-list.component';
import { TiposervicioAddComponent } from './tiposervicio/tiposervicio-add/tiposervicio-add.component';
import { TiposervicioListComponent } from './tiposervicio/tiposervicio-list/tiposervicio-list.component';
import { UbicacionListComponent } from './ubicacion/ubicacion-list/ubicacion-list.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { CalendarSyncSuccessComponent } from './calendar-sync-success/calendar-sync-success.component';
import { GuardiasCompletasComponent } from './datosmedico/guardias-completas/guardias-completas.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FlatpickrModule.forRoot(),
    NgxPayPalModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    CardsComponent,
    MedicoListComponent,
    MedicoAddComponent,
    AdministrativoListComponent,
    AdministrativoAddComponent,
    SpinnerComponent,
    DashboardComponent,
    EdificioListComponent,
    EdificioAddComponent,
    EspecialidadListComponent,
    EspecialidadAddComponent,
    GuardiaListComponent,
    GuardiaAddComponent,
    GuardiasdisponiblesComponent,
    LoginComponent,
    MisguardiasComponent,
    PagoComponent,
    PerfilEdificioComponent,
    PerfilMedicoComponent,
    AsignarguardiaComponent,
    ServicioListComponent,
    ServicioAddComponent,
    ServiciodomicilioListComponent,
    ServiciodomicilioAddComponent,
    TiposervicioAddComponent,
    UbicacionAddComponent,
    UbicacionListComponent,
    PerfilServicioComponent,
    TiposervicioListComponent,
    ZonaListComponent,
    ZonaAddComponent,
    EspecialidadMedicoComponent,
    MiPerfilComponent,
    MispostulacionesComponent,
    EventualidadComponent,
    SuccessSuscriptionComponent,
    PerfilAdministrativoComponent,
    ForgotpasswordComponent,
    PasswordresetComponent,
    PerfilAdministrativoComponent,
    AltaMasivaComponent,
    ErrorComponent,
    HomeComponent,
    CalendarSyncSuccessComponent,
    GuardiasCompletasComponent
  ],
  providers: [
    FlatpickrModule,
  ],
})
export class ComponentsModule {}
