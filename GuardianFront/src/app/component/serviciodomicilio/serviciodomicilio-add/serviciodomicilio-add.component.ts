import { Component, OnInit } from '@angular/core';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ZonasService } from 'src/app/services/zonas.service';

@Component({
  selector: 'app-serviciodomicilio-add',
  templateUrl: './serviciodomicilio-add.component.html',
  styleUrls: ['./serviciodomicilio-add.component.scss']
})
export class ServiciodomicilioAddComponent implements OnInit {


  zonas?: any[];

  especialidades?: any[];

  form: any = {
    duracion: null,
    idzona: null,
    duracion_guardia: null,
    frecuencia: null,
    met_asignacion: null
  };


  constructor(private serviciosService: ServiciosService, private zonasService: ZonasService, private especialidadService: EspecialidadesService, private handleError: HandleErrorsService) {

  }

  ngOnInit(): void {
    this.zonasService.getZonas().subscribe(data=>{
      this.zonas=data;
    });
    this.especialidadService.getEspecialidades().subscribe(data=>{
      this.especialidades=data;
    });
  }

  onSubmit(): void {
    const { idzona } = this.form;
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
    this.serviciosService.agregarServicioDomicilio(medicos, idzona).subscribe( data => {
      this.handleError.showSuccessAlert(data.message);
      this.form={};

    }, err =>{
      this.handleError.showErrors(err);
    });
  }

}
