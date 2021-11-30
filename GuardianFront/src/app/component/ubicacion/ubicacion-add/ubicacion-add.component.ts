import { Component, OnInit } from '@angular/core';
import { EdificiosService } from 'src/app/services/edificios.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';


@Component({
  selector: 'app-ubicacion-add',
  templateUrl: './ubicacion-add.component.html',
  styleUrls: ['./ubicacion-add.component.scss']
})
export class UbicacionAddComponent implements OnInit {

  form: any = {
    descripcion: null,
    idedificio: null
  };
  edificios?: any[];

  constructor(private ubicacionesService: UbicacionesService, private edificiosService: EdificiosService, private handleError: HandleErrorsService) { }

  onSubmit(): void {
    const { descripcion, idedificio } = this.form;
    this.ubicacionesService.agregarUbicacion(descripcion, idedificio).subscribe( data =>{
      this.handleError.showSuccessAlert(data.message);
      this.form={};
    }, err=>{
      this.handleError.showErrors(err);
    });
  }
  ngOnInit(): void {
    this.edificiosService.getEdificios().subscribe(data=>{
      this.edificios=data;
    });
  }

}
