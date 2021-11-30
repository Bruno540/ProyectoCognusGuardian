import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ZonasService } from 'src/app/services/zonas.service';

@Component({
  selector: 'app-zona-list',
  templateUrl: './zona-list.component.html',
  styleUrls: ['./zona-list.component.scss']
})
export class ZonaListComponent implements OnInit {

  zonas?: any[];
  tipo?: any;
  editable? = true;
  page = 1;
  pageSize = 5;
  collectionSize!: number;
  rutaAltaMasiva = "zonas"
  rutaArchivo = "Zona";
  filter: string ="";


  constructor(private zonaService : ZonasService, public router: Router, private tokenStorage: TokenStorageService,private handleError: HandleErrorsService) { }

  ngOnInit(): void {
    this.tipo = this.tokenStorage.getRoleName()
    this.getZonas();
  }

  refresh() {
    if(this.filter){
      this.getZonasBusqueda();
    }
    else{
      this.getZonas();
    }
  }

  getZonas() : void{
    this.zonaService.getZonasPaginacion(this.pageSize, this.page).subscribe(data=>{
      this.zonas=data.rows;
      this.collectionSize=data.count;
    })
  }

  busqueda(): void{
    this.getZonasBusqueda();
  }

  getZonasBusqueda(): void{
    this.zonaService.getZonasBusqueda(this.filter, this.pageSize, this.page).subscribe(data=>{
      this.zonas=data.rows;
      this.collectionSize=data.count;
    });
  }

  eliminar(id: number): void{
    this.handleError.showConfirmDelete().then(data=>{
      if(data.isConfirmed){
        this.zonaService.eliminarZona(id).subscribe(data=>{
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
    this.zonaService.actualizarZona(esp.id, esp.pais, esp.departamento, esp.localidad).subscribe(data=>{
      this.handleError.showSuccessAlert(data.message);
      this.getZonas();
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
