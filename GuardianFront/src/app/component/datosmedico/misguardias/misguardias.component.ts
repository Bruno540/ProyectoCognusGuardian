import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router} from '@angular/router';
import {AccionesMedicoService} from '../../../services/acciones-medico.service';
import Swal from 'sweetalert2';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';

@Component({
  selector: 'app-misguardias',
  templateUrl: './misguardias.component.html',
  styleUrls: ['./misguardias.component.scss']
})
export class MisguardiasComponent implements OnInit {


  guardias?: any;



  page = 1;
  pageSize = 4;

  calendarSync = false;

  filter = new FormControl('');

  constructor(private accionesMedicoService: AccionesMedicoService, public router: Router, private handleError: HandleErrorsService) {
    this.getGuardias();
  }

  getGuardias(){
    this.accionesMedicoService.obtenerGuardias().subscribe(data=>{
      if(data){
        this.guardias=data;
      }
      this.accionesMedicoService.ckCalendar().subscribe(data=>{
        this.calendarSync=data;
      });
    });
  }

  ngOnInit(): void {
    
  }

  sincronizarCalendar(){
    this.accionesMedicoService.sincronizarCalendario().subscribe(data=>{
      window.location.href=data;
    },err=>{  
      this.handleError.showErrors(err);
    });
  }

  quitarSincronizacionCalendar(){
    this.accionesMedicoService.quitarSincronizacionCalendario().subscribe(data=>{
      this.getGuardias();
      this.handleError.showSuccessAlert(data.message);
    },err=>{  
      this.handleError.showErrors(err);
    });
  }

  ofrecerliberar(idguardia:number):void{
    Swal.fire({
      title: 'Esta seguro?',
      text: "Quedara pendiente a que se encuentre sustituto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Entendido'
    }).then((result) => {
      if (result.isConfirmed) {
        this.accionesMedicoService.ofrecerliberar(idguardia).subscribe(data=>{
          this.handleError.showSuccessAlert("OK");
        },err=>{
          this.handleError.showErrors(err);
        })
      }
    })
  }

}
