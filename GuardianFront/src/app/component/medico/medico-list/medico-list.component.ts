import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import { MedicosService } from 'src/app/services/medicos.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico-list.component.html',
  styleUrls: ['./medico-list.component.css']
})

export class MedicoListComponent implements OnInit {

  medicos?: any[];

  rutaAltaMasiva = "medicos";
  rutaArchivo = "Medico";
  

  @ViewChild('myContainer', { read: ViewContainerRef }) container: ViewContainerRef | undefined;
  
  page = 1;
  pageSize = 5;
  collectionSize!: number;
  editable? = true;
  tipo: any;

  form: any = {
    email: null,
    telefono: null
  }

  public data: any;

  currentFile!: File

  filter = new FormControl('');

  notification: Number = 0;
  notifications :any = [];

  constructor(private medicosService: MedicosService, public router: Router,private tokenStorage: TokenStorageService, private handleError: HandleErrorsService) {
  }

  async ngOnInit(){
    this.tipo=this.tokenStorage.getRoleName();
    this.getMedicos();
  }


  refresh() {
    this.getMedicos();
  }

  busqueda(event: any): void{
    this.getMedicosBusqueda(event.target.value);
  }

  getMedicos(): void{
    this.medicosService.getMedicosPaginacion(this.pageSize, this.page).subscribe(data=>{
      this.medicos=data.rows;
      this.collectionSize=data.count;
    });
  }
  getMedicosBusqueda(filter: string): void{
    this.medicosService.getMedicosBusqueda(filter, this.pageSize, this.page).subscribe(data=>{
      this.medicos=data.rows;
      this.collectionSize=data.count;
    });
  }

  perfil(id:any): void{
    this.router.navigate(['/component/perfilmedico'], { queryParams: { id } });
  }

  editOn(medico: any): void{
    medico.editable=!medico.editable;
  }

  onEnter(e: any): void{
    e.target.blur();
  }

  eliminar(id: any):void{
    this.handleError.showConfirmDelete().then(data=>{
      if(data.isConfirmed){
        this.medicosService.deleteMedico(id).subscribe(data=>{
          this.handleError.showSuccessAlert(data.message);
          this.refresh();
        },err=>{
          this.handleError.showErrors(err);
          this.refresh();
        })
      }
    })
  }

  actualizarMedico(medico: any): void{
    this.medicosService.editarMedico(medico.id,medico.direccion,medico.fecha_nac,medico.Usuario.nombre,medico.Usuario.apellido,medico.Usuario.telefono, this.currentFile).subscribe(data=>{
      if(data.ok){
      this.getMedicos();
      this.handleError.showSuccessAlert(data.message);
     }
    }, err=>{
      this.handleError.showErrors(err);
    });
    medico.editable=false;
  }

}


