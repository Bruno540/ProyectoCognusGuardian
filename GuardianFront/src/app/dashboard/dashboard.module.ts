import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HorariosFavoritosComponent } from './dashboard-components/horarios-favoritos/horarios-favoritos.component';
import { ChartsModule } from 'ng2-charts';
import { TopMedicosComponent } from './dashboard-components/top-medicos/top-medicos.component';
import { GraficoEventualidadesComponent } from './dashboard-components/grafico-eventualidades/grafico-eventualidades';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboard',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Dashboard' }
      ]
    },
    component: DashboardComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes), ChartsModule],
  declarations: [DashboardComponent, HorariosFavoritosComponent, TopMedicosComponent, GraficoEventualidadesComponent]
})
export class DashboardModule {

}
