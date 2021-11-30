import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { GuardiasService } from 'src/app/services/guardias.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-guardia-list',
  templateUrl: './guardia-list.component.html',
  styleUrls: ['./guardia-list.component.scss']
})
export class GuardiaListComponent implements OnInit {

  guardias?: any[];

  idservicio?: number;

  servicio?: any;

  isLocal?: boolean;

  page = 1;
  pageSize = 5;
  collectionSize!: number;

  filter = new FormControl('');

  // tslint:disable:max-line-length
  constructor(private guardiasService: GuardiasService, private servicioService: ServiciosService, private route: ActivatedRoute, public router: Router, private handleError: HandleErrorsService) {
    this.route.queryParams.subscribe(params => {
      this.idservicio=params.idservicio;
      if(this.idservicio){
        this.servicioService.getServicio(this.idservicio).subscribe(data=>{
          this.servicio=data;
          this.isLocal=!!data.Local;
        });
        this.getGuardiasServicio();
      }
    });
  }

  ngOnInit(): void {
    
  }
  //aca deberia saber que tipo de servicio es, para ver que guardias voy a buscar
  getGuardiasServicio() : void{
    if(this.idservicio){
      this.servicioService.getGuardiasServicioPaginacion(this.idservicio, this.pageSize, this.page).subscribe(data=>{
        this.guardias=data.guardias;
        this.collectionSize = data.count;
      },err=>{
        this.router.navigate(['/component/error']);
      })
    }
  }

  refresh() {
    this.getGuardiasServicio();
  }
  
  busqueda(event: any): void{
    this.getGuardiasServicioBusqueda(event.target.value);
  }

  getGuardiasServicioBusqueda(filter: string): void{
    this.servicioService.getGuardiasServicioBusqueda(this.idservicio,filter, this.pageSize, this.page).subscribe(data=>{
      this.guardias=data.guardias;
      this.collectionSize=data.count;
    });
  }

  publicarGuardia(id: number): void{
    this.guardiasService.publicarGuardia(id).subscribe(data=>{
      this.handleError.showSuccessAlert(data.message);
      if(this.idservicio){
        this.servicioService.getGuardiasServicio(this.idservicio).subscribe(data=>{
          this.guardias=data;
        })
      }
    });
  }

  asignarMedicosGuardia(id: number): void{
    this.router.navigate(['/component/publicarguardia'], { queryParams: { id } });
  }

  eliminarGuardia(idguardia: any): void{
    this.handleError.showConfirmDelete().then(data=>{
      if(data.isConfirmed){
        this.guardiasService.eliminarGuardia(idguardia).subscribe(data=>{
          this.handleError.showSuccessAlert(data.message);
          this.refresh();
        },err=>{
          this.handleError.showErrors(err);
          this.refresh();
        });
      }
    })
  }

  verDetalles(idguardia: any){
    this.router.navigate(['/component/publicarguardia'], { queryParams: { idguardia } });
  }
}
