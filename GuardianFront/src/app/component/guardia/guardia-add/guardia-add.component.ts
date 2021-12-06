import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import { EdificiosService } from 'src/app/services/edificios.service';
import { GuardiasService } from 'src/app/services/guardias.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';

@Component({
  selector: 'app-guardia-add',
  templateUrl: './guardia-add.component.html',
  styleUrls: ['./guardia-add.component.scss']
})


export class GuardiaAddComponent implements OnInit {

  @Input() servicio: any;

  edificios?: any[];


  local? = false;

  zonas?: any[];

  date : Date = new Date();

  servicios?: any[];

  form: any = {
    descripcion: null,
    fechainicio: null,
    idservicio: null,
    duracion: null
  };

  constructor(private guardiasService: GuardiasService, private handleError: HandleErrorsService) {
    this.date = new Date();
  }



  ngOnInit(): void {

    if(this.servicio.Domicilio){
      this.local = false;
      this.form.descripcion = `Guardia a domicilio ${this.servicio.Domicilio.Zona.localidad} - ${this.servicio.Domicilio.Zona.departamento}`;
    }
    else{
      this.local = true
      this.form.descripcion = `Guardia ${this.servicio.Local.Edificio.nombre} - ${this.servicio.Local.Ubicacion.descripcion}`;

    }
  }

  onSubmit(): void {
    const { descripcion, fechainicio, duracion, met_asignacion } = this.form;
    if(new Date(fechainicio)<this.date){
      this.handleError.showErrorAlert(['Ingrese una fecha mayor a la de hoy']);
      return;
    }
    if(this.servicio){
      this.guardiasService.agregarGuardia(descripcion, fechainicio, this.servicio.id, duracion).subscribe( data =>{
        this.handleError.showSuccessAlert(data.message)
      }, err=>{
        this.handleError.showErrors(err);
      });
    }
  }

  updateDescription(){
    this.form.descripcion = this.form.descripcion.split('+')[0];
    this.form.descripcion = `${this.form.descripcion} + ${moment(this.form.fechainicio).format("YYYY-MM-DD")} `;
  }

}
