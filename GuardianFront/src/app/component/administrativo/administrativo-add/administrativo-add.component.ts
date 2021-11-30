import { Component, OnInit } from '@angular/core';
import { AdministrativosService } from 'src/app/services/administrativos.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';

@Component({
  selector: 'app-administrativo-add',
  templateUrl: './administrativo-add.component.html',
  styleUrls: ['./administrativo-add.component.scss']
})
export class AdministrativoAddComponent implements OnInit {

  form: any = {
    email: null,
    nombre: null,
    apellido: null,
    telefono: null
  };

  constructor(private administrativosService: AdministrativosService, private handleError: HandleErrorsService) { }

  onSubmit(): void {
    const { email, nombre, apellido, telefono } = this.form;
    this.administrativosService.crearAdministrativo(email, nombre, apellido, telefono).subscribe( data =>{
      this.form={};
      this.handleError.showSuccessAlert(data.message);
    }, error => {
      this.handleError.showErrors(error);
    });
  }

  ngOnInit(): void {
  }

}
