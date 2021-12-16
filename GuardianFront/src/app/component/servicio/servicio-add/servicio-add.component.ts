import { Component, OnInit, ViewChild } from '@angular/core';
import { EdificiosService } from 'src/app/services/edificios.service';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { TiposServicioService } from 'src/app/services/tiposervicio.service';

@Component({
  selector: 'app-servicio-add',
  templateUrl: './servicio-add.component.html',
  styleUrls: ['./servicio-add.component.scss']
})
export class ServicioAddComponent implements OnInit {

  edificios?: any[];

  especialidades?: any[];

  tipos?: any[];

  @ViewChild('ubicacion') ubicacion: any;

  ubicaciones?: any[];

  form: any = {
    idtipo: null,
    idedificio: null,
    idubicacion: null
  };

  constructor(private edificiosService: EdificiosService, private serviciosService: ServiciosService, private tiposservicioService: TiposServicioService, private especialidadService: EspecialidadesService, private handleError: HandleErrorsService) {
    
  }

  ngOnInit(): void {
    this.edificiosService.getEdificios().subscribe(data=>{
      this.edificios=data;
    });
    this.tiposservicioService.getTipos().subscribe(data =>{
      this.tipos=data;
    });
    this.especialidadService.getEspecialidades().subscribe(data=>{
      this.especialidades=data;
    });
  }

  onSubmit(): void {
    var medicos:any[]=[];
    for(const esp of this.especialidades!){
      if(esp.seleccionada){
        const idespecialidad = esp.id;
        const cantidad = esp.cantidad;
        medicos=[
          ...medicos,
          {
            idespecialidad,
            cantidad
          }
        ]
      }
    }
    const { idtipo, idedificio, idubicacion } = this.form;
    this.serviciosService.agregarServicio(idtipo, medicos, idedificio, idubicacion).subscribe( data =>{
      this.handleError.showSuccessAlert(data.message);
      this.form={};
      this.ubicacion.nativeElement.value=null;
      this.ubicaciones = [];
    },err=>{
      this.handleError.showErrors(err);
    });
  }

  onClick(): void{
    this.ubicaciones = [];
    this.ubicacion.nativeElement.value=null;
    this.edificiosService.obtenerUbicacionesDisponibleEdificio(this.form.idedificio).subscribe(data=>{
      this.ubicaciones=data;
    });
  }

}
