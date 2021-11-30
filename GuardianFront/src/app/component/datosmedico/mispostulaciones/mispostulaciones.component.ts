import { Component, OnInit } from '@angular/core';
import { AccionesMedicoService } from 'src/app/services/acciones-medico.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';

@Component({
  selector: 'app-mispostulaciones',
  templateUrl: './mispostulaciones.component.html',
  styleUrls: ['./mispostulaciones.component.scss']
})
export class MispostulacionesComponent implements OnInit {

  guardias?: any[];

  constructor(private accionesMedicoService: AccionesMedicoService, private handleError: HandleErrorsService) { }

  ngOnInit(): void {
    this.accionesMedicoService.obtenerPostulaciones().subscribe(data=>{
      this.guardias = data;
    });
  }

  cancelarPostulacion(idguardia: number): void{
    this.accionesMedicoService.cancelarPostulacion(idguardia).subscribe(data=>{
      this.ngOnInit();
    },err=>{
      this.handleError.showErrors(err);
    });
  }

}
