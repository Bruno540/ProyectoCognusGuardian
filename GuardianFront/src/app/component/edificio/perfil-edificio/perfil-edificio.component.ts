import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EdificiosService } from 'src/app/services/edificios.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-perfil-edificio',
  templateUrl: './perfil-edificio.component.html',
  styleUrls: ['./perfil-edificio.component.scss']
})
export class PerfilEdificioComponent implements OnInit {

  url: string;
  edificio?: any;
  salas?: number;
  constructor(private route: ActivatedRoute, private edificiosService: EdificiosService,  public router: Router) {
    this.url=environment.BACKEND_URL;
    this.route.queryParams.subscribe(params => {
      const id =params.idedificio;
      this.edificiosService.obtenerEdificio(id).subscribe(data=>{
        this.edificio=data;
        this.salas=this.edificio.Ubicacions.length;
      },err=>{
        this.router.navigate(['/component/error']);
      });
    });
  }

  ngOnInit(): void {
  }

  editar(idedificio:any, nombre:any, direccion:any, telefono:any): void {
    this.router.navigate(['/editarEdificio'], { queryParams: { idedificio, nombre, direccion, telefono } });
  }

}
