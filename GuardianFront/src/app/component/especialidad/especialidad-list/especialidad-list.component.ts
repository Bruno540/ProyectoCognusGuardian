import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-especialidad-list',
  templateUrl: './especialidad-list.component.html',
  styleUrls: ['./especialidad-list.component.scss']
})
export class EspecialidadListComponent implements OnInit {

  especialidades?: any[];
  tipo?: any;
  editable? = true;
  page = 1;
  pageSize = 5;
  collectionSize!: number;
  filter: string="";
  rutaAltaMasiva = "especialidades";
  rutaArchivo = "Especialidad";


  constructor(private especialidadService: EspecialidadesService, public router: Router, private tokenStorage: TokenStorageService, private handleError: HandleErrorsService) { }

  ngOnInit(): void {
    this.tipo = this.tokenStorage.getRoleName()
    this.getespecialidades();
  }

  getespecialidades(): void{
    this.especialidadService.getEspecialidadesPaginacion(this.pageSize, this.page).subscribe(data=>{
      this.especialidades=data.rows;
      this.collectionSize=data.count;
    })
  }

  refresh() {
    if(!this.filter){
      this.getespecialidades();
    } 
    else{
      this.getEspecialidadesBusqueda(this.filter)
    }
  }

  busqueda(): void{
    this.getEspecialidadesBusqueda(this.filter);
  }

  getEspecialidadesBusqueda(filter: string): void{
    this.especialidadService.getEspecialidadesBusqueda(filter, this.pageSize, this.page).subscribe(data=>{
      this.especialidades=data.rows;
      this.collectionSize=data.count;
    });
  }

  agregar(): void{
    this.router.navigate(['/especialidadesabm']);
  }

  eliminar(idespecialidad: number): void{
    this.handleError.showConfirmDelete().then(data=>{
      if(data.isConfirmed){
        this.especialidadService.eliminarEspecialidad(idespecialidad).subscribe(data=>{
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
    this.especialidadService.actualizarEspecialidad(esp.id, esp.nombre).subscribe(data=>{
      this.getespecialidades();
      this.handleError.showSuccessAlert(data.message)
    }, err=>{
      this.handleError.showErrors(err);
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

