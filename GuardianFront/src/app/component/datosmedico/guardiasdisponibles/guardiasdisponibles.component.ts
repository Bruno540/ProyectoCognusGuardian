import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {DecimalPipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import { AccionesMedicoService } from 'src/app/services/acciones-medico.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';

@Component({
  selector: 'app-guardiasdisponibles',
  templateUrl: './guardiasdisponibles.component.html',
  styleUrls: ['./guardiasdisponibles.component.scss']
})
export class GuardiasdisponiblesComponent implements OnInit {

  guardias?: any[];

  especialidades: any;

  guardiaseleccionada!: any;

  errorMessage: any;

  isError = false;

  selectedEsp: any;

  page = 1;
  pageSize = 4;
  collectionSize!: number;

  filter = new FormControl('');

  constructor(private accionesMedicoService: AccionesMedicoService, public router: Router,private handleError: HandleErrorsService) {
  }

  test(guardia: any):void {
    this.guardiaseleccionada= guardia;
    this.accionesMedicoService.getEspecialidadesGuardia(guardia.id).subscribe(data=>{
      this.especialidades=data;
    });
  }

  ngOnInit(): void {
    this.obtenerGuardiasDisponibles();
  }

  obtenerGuardiasDisponibles(){
    this.accionesMedicoService.obtenerGuardiasDisponibles().subscribe(data=>{
      this.guardias=data;
    }, error =>{
      this.isError = true;
      this.errorMessage = error.error.message
    });
  }

  postularse(): void{
    this.accionesMedicoService.postularseGuardia(this.guardiaseleccionada.id, this.selectedEsp).subscribe(data=>{
      this.handleError.showSuccessAlert(data.message);
      this.obtenerGuardiasDisponibles();
    },err=>{
      this.handleError.showErrors(err)
    });
  }

}
