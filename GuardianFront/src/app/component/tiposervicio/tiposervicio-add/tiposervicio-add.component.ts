import { Component, OnInit } from '@angular/core';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import {TiposServicioService} from '../../../services/tiposervicio.service';

@Component({
  selector: 'app-tiposervicio-add',
  templateUrl: './tiposervicio-add.component.html',
  styleUrls: ['./tiposervicio-add.component.scss']
})
export class TiposervicioAddComponent implements OnInit {

  constructor(private tiposservicioService: TiposServicioService, private handleError: HandleErrorsService) { }

  form: any = {
    nombre: null
  };

  tipos: any[] = [];

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { nombre } = this.form;
    this.tiposservicioService.agregarTipo(nombre).subscribe( data =>{
      this.handleError.showSuccessAlert(data.message);
      this.form={};
    }, err=>{
      this.handleError.showErrors(err);
    });
  }
  
}
