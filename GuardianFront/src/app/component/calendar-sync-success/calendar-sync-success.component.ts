import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccionesMedicoService } from 'src/app/services/acciones-medico.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';

@Component({
  selector: 'app-calendar-sync-success',
  templateUrl: './calendar-sync-success.component.html',
  styleUrls: ['./calendar-sync-success.component.scss']
})
export class CalendarSyncSuccessComponent implements OnInit {

  
  constructor(private route: ActivatedRoute, private handleError: HandleErrorsService, public router: Router, private accionesMedico: AccionesMedicoService) { 
    this.route.queryParams.subscribe(params => {
      const code = params.code;
      const idusuario = params.state;
      this.accionesMedico.confirmarSincronizacionCalendario(code,idusuario).subscribe(data=>{
      },err=>{
        this.router.navigate(['/component/error']);
      });
    });
  }

  ngOnInit(): void {
  }

}
