import { Component, OnInit } from '@angular/core';
import { MedicosService } from '../../../services/medicos.service';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { ZonasService } from 'src/app/services/zonas.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import * as moment from 'moment';

@Component({
  selector: 'app-medico-add',
  templateUrl: './medico-add.component.html',
  styleUrls: ['./medico-add.component.scss']
})
export class MedicoAddComponent implements OnInit {

  form: any = {
    direccion: "",
    fecha_nac: null,
    email: "",
    nombre: "",
    apellido: "",
    telefono: "",
    especialidades: "",
    zona:""
  };

  currentFile!: File;

  especialidades?: any[];
  zonas?: any[];

  constructor(private medicoService: MedicosService, private especialidadService: EspecialidadesService,private zonaService : ZonasService, private handleError: HandleErrorsService) { }

  onSubmit(): void {
    const { telefono, direccion, fecha_nac, email, nombre, apellido, especialidades, zona } = this.form;
    const fechaTransformada = moment(fecha_nac).format('yyyy-MM-DDTHH:mm')
    this.medicoService.crearMedico(direccion, fechaTransformada, email, nombre, apellido, telefono, especialidades, this.currentFile, zona).subscribe( data =>{
      if(data.ok && data.body){
        this.form={};
        this.handleError.showSuccessAlert(data.body.message);
      }
    }, error => {
      this.handleError.showErrors(error);
    });
  }

  ngOnInit(): void {
    this.especialidadService.getEspecialidades().subscribe(data => {
      this.especialidades = data;
      this.zonaService.getZonas().subscribe(data=>{
        this.zonas = data;
      })
    });
   
  }

  selectFile(event: any): void {
    this.currentFile = event.target.files[0];
  }
}
