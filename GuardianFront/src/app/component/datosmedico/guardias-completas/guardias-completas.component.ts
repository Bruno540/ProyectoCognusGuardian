import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccionesMedicoService } from 'src/app/services/acciones-medico.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';

@Component({
  selector: 'app-guardias-completas',
  templateUrl: './guardias-completas.component.html',
  styleUrls: ['./guardias-completas.component.scss']
})
export class GuardiasCompletasComponent implements OnInit {

  constructor(private accionesMedicoService: AccionesMedicoService, public router: Router,private handleError: HandleErrorsService) { }

  guardias?: any[];

  
  page = 1;
  pageSize = 4;
  collectionSize!: number;
  fechainicio: any ="";
  fechafin: any ="";

  ngOnInit(): void {
    this.getGuardiasCompletadas();
  }

  getGuardiasCompletadas(){
    this.accionesMedicoService.obtenerGuardiasCompletadas(this.fechainicio,this.fechafin).subscribe(data=>{
      this.guardias=data;
    },err=>{
      this.handleError.showErrors(err);
    });
  }

}
