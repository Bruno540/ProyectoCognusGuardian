import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio-list.component.html',
  styleUrls: ['./servicio-list.component.scss']
})

export class ServicioListComponent implements OnInit {

  servicios?: any[];
  tipo?: any;
  page = 1;
  pageSize = 5;
  collectionSize!: number;

  filter = new FormControl('');

  constructor(private serviciosService: ServiciosService, private tokenStorage: TokenStorageService, public router: Router,private handleError: HandleErrorsService) {
  }

  ngOnInit(): void {
    this.tipo = this.tokenStorage.getRoleName()
    this.getServicios();
  }

  getServicios(): void{
    this.serviciosService.getServiciosLocalesPaginacion(this.pageSize, this.page).subscribe(data=>{
      this.servicios=data.rows;
      this.collectionSize=data.count;
    });
  }

  refresh() {
    this.getServicios();
  }

  busqueda(event: any): void{
    this.getServiciosBusqueda(event.target.value);
  }

  getServiciosBusqueda(filter: string): void{
    this.serviciosService.getServicioBusqueda(filter, this.pageSize, this.page).subscribe(data=>{
      this.servicios=data.rows;
      this.collectionSize=data.count;
    });
  }


  verGuardias(idservicio: any){
    this.router.navigate(['/component/guardias'], { queryParams: { idservicio } });
  }

  eliminarServicio(id:any){
    this.handleError.showConfirmDelete().then(data=>{
      if(data.isConfirmed){
        this.serviciosService.eliminarServicio(id).subscribe(data=>{
          this.handleError.showSuccessAlert(data.message);
          this.refresh();
        },err=>{
          this.handleError.showErrors(err);
          this.refresh();
        })
      }
    })

  }

  verDetalles(idedificio: any){
    this.router.navigate(['/component/servicio'], { queryParams: { idedificio } });
  }

}