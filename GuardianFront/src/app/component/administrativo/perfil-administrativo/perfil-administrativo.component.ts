import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministrativosService } from 'src/app/services/administrativos.service';

@Component({
  selector: 'app-perfil-administrativo',
  templateUrl: './perfil-administrativo.component.html',
  styleUrls: ['./perfil-administrativo.component.scss']
})
export class PerfilAdministrativoComponent implements OnInit {

  administrativo?: any;

  constructor(private route: ActivatedRoute, private adminService: AdministrativosService, public router: Router) {
    this.route.queryParams.subscribe(params => {
      const id =params.id;
      this.adminService.obtenerAdministrativo(id).subscribe(data=>{
        this.administrativo=data;
      },err=>{
        this.router.navigate(['/component/error']);
      });
    });
   }

  ngOnInit(): void {
  }

}
