import { Component, OnInit } from '@angular/core';
import { EstadisticasService } from 'src/app/services/estadisticas.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';

@Component({
  selector: 'app-top-medicos',
  templateUrl: './top-medicos.component.html',
  styleUrls: ['./top-medicos.component.css']
})
export class TopMedicosComponent implements OnInit {

  medicos?:any[];

  constructor(private service: EstadisticasService,private handleError: HandleErrorsService) { 

  }

  fechainicio?: string ="";
  fechafin?: string ="";

  ngOnInit(): void {
   this.obtenerMedicos();
  }

  test(e:any){
    this.obtenerMedicos();
  }

  obtenerMedicos(): void{
    this.service.obtenerHorasMedicos(this.fechainicio,this.fechafin).subscribe(data=>{
      this.medicos=data;
    },err=>{
      this.handleError.showErrors(err);
    });
  }

}
