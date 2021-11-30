import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccionesMedicoService } from 'src/app/services/acciones-medico.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {

  medico?: any;
  editable? = false;
  currentFile!: File;
  Especialidads?: any;
  url: string;
  token?: string;
  userComponent = true;

  form: any = {
    id:null,
    direccion: null,
    fecha_nac: null,
    nombre: null,
    apellido: null,
    telefono: null,
    rutaFoto:null,
  };

  constructor(private accionesMedicoService : AccionesMedicoService,private datePipe: DatePipe, private handleError: HandleErrorsService, private tokenStorage: TokenStorageService) { 
    this.url=environment.BACKEND_URL;
    this.getdatos();
  }

  ngOnInit(): void {
  }

  getdatos():void{
    this.accionesMedicoService.obtenerDatos().subscribe(data=>{
      this.form.id = data.id;
      this.form.nombre = data.Usuario.nombre;
      this.form.apellido = data.Usuario.apellido;
      this.form.direccion = data.direccion;
      this.form.telefono = data.Usuario.telefono;
      this.form.fecha_nac = this.datePipe.transform(new Date(data.fecha_nac),'yyyy-MM-dd');
      this.form.rutaFoto = data.rutaFoto;
      this.Especialidads = data.Especialidads;
    });
  }

  editOn(): void{
    this.editable=!this.editable;
  }

  onEnter(e: any): void{
    e.target.blur();
  }

  actualizarMedico(): void{
    this.accionesMedicoService.editarMedico(this.form.direccion,this.form.fecha_nac,this.form.nombre,this.form.apellido,this.form.telefono, this.currentFile).subscribe(data=>{
      if(data.ok){
        this.tokenStorage.saveUserName(this.form.nombre);
        this.handleError.showSuccessAlert(data.message);
        this.editable=false;
        this.getdatos();
      }
    }, err=>{
      this.handleError.showErrors(err);
    });
  }

  selectFile(event: any): void {
   this.currentFile = event.target.files[0];
  }

  sincronizarCalendar(){
    this.accionesMedicoService.sincronizarCalendario().subscribe(data=>{
      window.location.href=data;
    },err=>{  
      this.handleError.showErrors(err);
    });
  }

}
