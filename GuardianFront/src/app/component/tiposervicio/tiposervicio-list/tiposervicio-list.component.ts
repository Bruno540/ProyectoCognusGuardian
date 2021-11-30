import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import { TiposServicioService } from 'src/app/services/tiposervicio.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-tiposervicio',
  templateUrl: './tiposervicio-list.component.html',
  styleUrls: ['./tiposervicio-list.component.scss']
})
export class TiposervicioListComponent implements OnInit {

  tipoServicios?: any[];
  tipo?: any;
  editable? = true;
  page = 1;
  pageSize = 5;
  collectionSize!: number;
  rutaAltaMasiva = "tipoServicio";
  rutaArchivo = "TipoServicio";


  constructor(private tipoServicioService : TiposServicioService, public router: Router, private tokenStorage: TokenStorageService,private handleError: HandleErrorsService) { }

  ngOnInit(): void {
    this.tipo = this.tokenStorage.getRoleName()
    this.getTiposServicio();
  }

  refresh() {
    this.getTiposServicio();
  }

  getTiposServicio() : void{
    this.tipoServicioService.getTiposPaginacion(this.pageSize, this.page).subscribe(data=>{
      this.tipoServicios=data.rows;
      this.collectionSize=data.count;
    })
  }

  busqueda(event: any): void{
    this.getTipoServicioBusqueda(event.target.value);
  }

  getTipoServicioBusqueda(filter: string): void{
    this.tipoServicioService.getTipoServicioBusqueda(filter, this.pageSize, this.page).subscribe(data=>{
      this.tipoServicios=data.rows;
      this.collectionSize=data.count;
    });
  }

  agregar(): void{
    this.router.navigate(['/especialidadesabm']);
  }

  eliminar(id: number): void{
    this.handleError.showConfirmDelete().then(data=>{
      if(data.isConfirmed){
        this.tipoServicioService.eliminarTipoServicio(id).subscribe(data=>{
          this.handleError.showSuccessAlert(data.message);
          this.refresh();
        },err=>{
          this.handleError.showErrors(err);
          this.refresh();
        })
      }
    })
  }

  editar(esp : any): void{
    this.tipoServicioService.actualizarTipoServicio(esp.id, esp.nombre).subscribe(data=>{
      this.handleError.showSuccessAlert(data.message)
      this.getTiposServicio();
    }, err=>{
      this.handleError.showErrors(err)
    });
    esp.editable = false;
  }

  editOn(esp: any): void{
    esp.editable=!esp.editable;
  }

  onEnter(e: any): void{
    e.target.blur();
  }

}
