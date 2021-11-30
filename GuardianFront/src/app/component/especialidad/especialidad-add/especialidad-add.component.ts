import { Component, OnInit } from '@angular/core';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';

@Component({
  selector: 'app-especialidad-add',
  templateUrl: './especialidad-add.component.html',
  styleUrls: ['./especialidad-add.component.scss']
})
export class EspecialidadAddComponent implements OnInit {

  form: any = {
    nombre: null
  };

  constructor(private especialidadServicio: EspecialidadesService,  private handleError: HandleErrorsService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { nombre } = this.form;
    this.especialidadServicio.agregarEspecialidad(nombre).subscribe( data =>{
      this.handleError.showSuccessAlert(data.message);
      this.form={};
    }, err=>{
      this.handleError.showErrors(err);
    });
  }

}
