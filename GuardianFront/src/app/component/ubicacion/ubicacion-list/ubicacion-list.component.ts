import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EdificiosService } from 'src/app/services/edificios.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';

@Component({
  selector: 'app-ubicacion-list',
  templateUrl: './ubicacion-list.component.html',
  styleUrls: ['./ubicacion-list.component.scss']
})
export class UbicacionListComponent implements OnInit {

  ubicaciones?: any[];

  edificio?: any;

  idedificio?: number;

  editable? = true;

  tipo: any;

  page = 1;

  pageSize = 5;

  collectionSize!: number;

  constructor(private ubicacionesService: UbicacionesService, private edificiosService: EdificiosService, private route: ActivatedRoute, private tokenStorage: TokenStorageService, private handleError: HandleErrorsService, public router: Router) {
    this.route.queryParams.subscribe(params => {
      this.idedificio=params.idedificio;
      if(this.idedificio){
        this.edificiosService.obtenerEdificio(this.idedificio!).subscribe(data=>{
          this.edificio =  data;
        },err=>{
          this.router.navigate(['/component/error']);
        });
      }
    });
  }

  ngOnInit(): void {
    this.tipo=this.tokenStorage.getRoleName();
    this.getUbicaciones();
  }

  refresh() {
    this.getUbicaciones();
  }

  getUbicaciones() :void{
    if(this.idedificio){
      this.edificiosService.obtenerUbicacionesEdificioPag(this.idedificio, this.pageSize, this.page).subscribe(data=>{
        this.ubicaciones=data.rows;
        this.collectionSize=data.count;
      });
    }
    else{
      this.ubicacionesService.obtenerUbicacionesPaginacion(this.pageSize, this.page).subscribe(data=>{
        this.ubicaciones=data.rows;
        this.collectionSize=data.count;
      });
    }
  }

  actualizarDescripcion(sala: any, event: any): void{
    const descripcion = event.target.value;
    this.ubicacionesService.actualizarUbicacion(sala.id,descripcion,sala.Edificio.id).subscribe(data=>{
      this.handleError.showSuccessAlert(data.message);
    }, err=>{
      this.handleError.showErrors(err);
    });
    sala.editable=false;
  }

  editOn(sala:any): void{
    sala.editable=!sala.editable;
  }

  onEnter(e: any): void{
    e.target.blur();
  }

  eliminar(idedificio:any, id:any){
    this.handleError.showConfirmDelete().then(data=>{
      if(data.isConfirmed){
        this.ubicacionesService.eliminar(idedificio,id).subscribe(data=>{
          this.handleError.showSuccessAlert(data.message);
          this.refresh();
        },err=>{
          this.handleError.showErrors(err);
          this.refresh();
        })
      }
    })
  }

  busqueda(event: any): void{
    this.getUbicacionesBusqueda(event.target.value);
  }

  getUbicacionesBusqueda(filter: string): void{
    this.ubicacionesService.getUbicacionesBusqueda(filter, this.pageSize, this.page).subscribe(data=>{
      this.ubicaciones=data.rows;
      this.collectionSize=data.count;
    });
  } 

}
