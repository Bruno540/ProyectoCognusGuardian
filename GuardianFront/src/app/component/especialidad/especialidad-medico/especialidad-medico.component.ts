import { Component, Input, OnInit } from '@angular/core';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import { MedicosService } from 'src/app/services/medicos.service';

@Component({
  selector: 'app-especialidad-medico',
  templateUrl: './especialidad-medico.component.html',
  styleUrls: ['./especialidad-medico.component.scss']
})
export class EspecialidadMedicoComponent implements OnInit {

  form: any = {
    especialidades: null,
  };
  especialidades?: any[];

  @Input()
    medicoId: any;

  constructor(private especialidadService: EspecialidadesService, private medicoService: MedicosService,  private handleError: HandleErrorsService) {}

  ngOnInit(): void {
    this.especialidadService.getEspecialidades().subscribe(data => {
      this.especialidades = data;
    });
  }

  onSubmit(): void {
    const {especialidades} = this.form;
    this.medicoService.agregarEspecialidadesMedico(this.medicoId, especialidades).subscribe( data =>{
      this.handleError.showSuccessAlert(data.message)
    }, err=>{
      this.handleError.showErrors(err);
    });
  }

}
