import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-perfil-servicio',
  templateUrl: './perfil-servicio.component.html',
  styleUrls: ['./perfil-servicio.component.scss']
})
export class PerfilServicioComponent implements OnInit {

  servicio?: any;

  local = false;

  constructor(private servicioService: ServiciosService, public router: Router, private route: ActivatedRoute) { 
   
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id =params.idedificio;
      this.servicioService.getServicio(id).subscribe(data=>{
        this.servicio = data;
        if(this.servicio.Local){
          this.local = true;
        }
      },err=>{
        this.router.navigate(['/component/error']);
      })
    });
  }

}
