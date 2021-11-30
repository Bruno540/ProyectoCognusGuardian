import { Routes } from '@angular/router';

import { CardsComponent } from './card/card.component';
import { DashboardComponent } from './guardia/dashboard/dashboard.component';
import { LoginComponent } from './account/login/login.component';
import { MisguardiasComponent } from './datosmedico/misguardias/misguardias.component';
import { PagoComponent } from './account/pago/pago.component';
import { PerfilEdificioComponent } from './edificio/perfil-edificio/perfil-edificio.component';
import { PerfilMedicoComponent } from './medico/perfil-medico/perfil-medico.component';
import { ServicioListComponent } from './servicio/servicio-list/servicio-list.component';
import { TiposervicioAddComponent } from './tiposervicio/tiposervicio-add/tiposervicio-add.component';
import { GuardiasdisponiblesComponent } from './datosmedico/guardiasdisponibles/guardiasdisponibles.component';
import { PerfilServicioComponent } from './servicio/perfil-servicio/perfil-servicio.component';
import { ZonaListComponent } from './zona/zona-list/zona-list..component';
import { MiPerfilComponent } from './datosmedico/mi-perfil/mi-perfil.component';
import { MispostulacionesComponent } from './datosmedico/mispostulaciones/mispostulaciones.component';
import { EventualidadComponent } from './datosmedico/eventualidad/eventualidad.component';
import { SuccessSuscriptionComponent } from './account/success-suscription/success-suscription.component';
import { PerfilAdministrativoComponent } from './administrativo/perfil-administrativo/perfil-administrativo.component';
import { AdminGuard } from '../guards/admin.guard';
import { MedicoGuard } from '../guards/medico.guard';
import { VisitanteGuard } from '../guards/visitante.guard';
import { AdminAdministrativoGuard } from '../guards/admin-administrativo.guard';
import { ForgotpasswordComponent } from './account/forgotpassword/forgotpassword.component';
import { PasswordresetComponent } from './account/passwordreset/passwordreset.component';
import { AdministrativoListComponent } from './administrativo/administrativo-list/administrativo-list.component';
import { EdificioListComponent } from './edificio/edificio-list/edificio-list.component';
import { EspecialidadListComponent } from './especialidad/especialidad-list/especialidad-list.component';
import { GuardiaListComponent } from './guardia/guardia-list/guardia-list.component';
import { MedicoListComponent } from './medico/medico-list/medico-list.component';
import { AsignarguardiaComponent } from './guardia/asignarguardia/asignarguardia.component';
import { ServiciodomicilioListComponent } from './serviciodomicilio/serviciodomicilio-list/serviciodomicilio-list.component';
import { UbicacionAddComponent } from './ubicacion/ubicacion-add/ubicacion-add.component';
import { UbicacionListComponent } from './ubicacion/ubicacion-list/ubicacion-list.component';
import { TiposervicioListComponent } from './tiposervicio/tiposervicio-list/tiposervicio-list.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { CalendarSyncSuccessComponent } from './calendar-sync-success/calendar-sync-success.component';
import { GuardiasCompletasComponent } from './datosmedico/guardias-completas/guardias-completas.component';

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'card',
				component: CardsComponent,
				data: {
					title: 'Menu de opciones',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Cards' }
					]
				}
			},
			{
				path: 'medicos',
				component: MedicoListComponent,
				canActivate: [AdminAdministrativoGuard]

			},
			{
				path: 'administrativos',
				component: AdministrativoListComponent,
				canActivate: [AdminAdministrativoGuard]

			},
			{
				path: 'panel',
				component: DashboardComponent,
				canActivate: [AdminAdministrativoGuard]
			},
			{
				path: 'edificios',
				component: EdificioListComponent,
				canActivate: [AdminGuard]
			},
			{
				path: 'especialidades',
				component: EspecialidadListComponent,
				canActivate: [AdminGuard]
			},
			{
				path: 'guardias',
				component: GuardiaListComponent,
				canActivate: [AdminAdministrativoGuard]

			},
			{
				path: 'login',
				component: LoginComponent,
				canActivate: [VisitanteGuard]
			},
			{
				path: 'misguardias',
				component: MisguardiasComponent,
				canActivate: [MedicoGuard]
			},
			{
				path: 'pago',
				component: PagoComponent,
				canActivate: [VisitanteGuard]
			},
			{
				path: 'perfiledificio',
				component: PerfilEdificioComponent,
				canActivate: [AdminAdministrativoGuard]
			},
			{
				path: 'perfilmedico',
				component: PerfilMedicoComponent,
				canActivate: [AdminAdministrativoGuard]

			},
			{
				path: 'perfiladministrativo',
				component: PerfilAdministrativoComponent,
				canActivate: [AdminAdministrativoGuard]

			},
			{
				path: 'publicarguardia',
				component: AsignarguardiaComponent,
				canActivate: [AdminAdministrativoGuard]
			},
			{
				path: 'servicios',
				component: ServicioListComponent,
				canActivate: [AdminAdministrativoGuard]
			},
			{
				path: 'serviciosdomicilio',
				component: ServiciodomicilioListComponent,
				canActivate: [AdminAdministrativoGuard]

			},
			{
				path: 'tiposervicioabm',
				component: TiposervicioAddComponent,
				canActivate: [AdminGuard]
			},
			{
				path: 'tiposervicio',
				component: TiposervicioListComponent,
				canActivate: [AdminGuard]
			},
			{
				path: 'ubicaciones',
				component: UbicacionListComponent,
				canActivate: [AdminGuard]
			},
			{
				path: 'guardiasdisponibles',
				component: GuardiasdisponiblesComponent,
				canActivate: [MedicoGuard]
			},
			{
				path: 'misguardias',
				component: MisguardiasComponent,
				canActivate: [MedicoGuard]
			},
			{
				path: 'eventualidades',
				component: EventualidadComponent,
				canActivate: [MedicoGuard]
			},
			{
				path: 'servicio',
				component: PerfilServicioComponent,
				canActivate: [AdminAdministrativoGuard]

			},
			{
				path: 'zonas',
				component: ZonaListComponent,
				canActivate: [AdminGuard]
			},
			{
				path: 'miperfil',
				component: MiPerfilComponent,
				canActivate: [MedicoGuard]
			},
			{
				path: 'mispostulaciones',
				component: MispostulacionesComponent,
				canActivate: [MedicoGuard]
			},
			{
				path: 'guardiascompletadas',
				component: GuardiasCompletasComponent,
				canActivate: [MedicoGuard]
			},
			{
				path: 'success',
				component: SuccessSuscriptionComponent,
				canActivate: [VisitanteGuard]
				
			},
			{
				path:'forgotpassword',
				component:ForgotpasswordComponent,
				canActivate: [VisitanteGuard]
			},
			{
				path:'passwordreset',
				component: PasswordresetComponent
			},
			{
				path:'error',
				component: ErrorComponent
			},
			{
				path:'home',
				component: HomeComponent,
				canActivate: [VisitanteGuard]
			},
			{
				path:'successcalendarsync',
				component: CalendarSyncSuccessComponent,
				canActivate: [MedicoGuard]
			}
		]
	}
];
