import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-perfil-medico',
  templateUrl: './perfil-medico.component.html',
  styleUrls: ['./perfil-medico.component.scss']
})
export class PerfilMedicoComponent implements OnInit {

  medico?: any;

  especialidades?: any;

  tipo: any;

   url: string;

  constructor(private route: ActivatedRoute, private medicoService: MedicosService, public router: Router, private handleError: HandleErrorsService, private tokenStorage: TokenStorageService) {
    this.url = environment.BACKEND_URL;
   
   }

   obtenerMedico(id: number): void{
    this.medicoService.obtenerMedico(id).subscribe(data=>{
      this.medico=data;
      this.especialidades=this.medico.Especialidads.length;
    },err=>{
      this.router.navigate(['/component/error']);
    });
   }

  ngOnInit(): void {
    this.tipo=this.tokenStorage.getRoleName();
    this.route.queryParams.subscribe(params => {
      const id =params.id;
      this.obtenerMedico(id);
    });
  }

  eliminarEspecialidad(especialidad:number){
    this.medicoService.quitarEspecialidadMedico(this.medico.id,especialidad).subscribe((data:any)=>{
      this.obtenerMedico(this.medico.id);
    },(err:any)=>{
      this.handleError.showErrors(err);
    });
  }

  editar(id: any, nombre: any, apellido: any, telefono: any, direccion: any, fecha_nac: any): void{
    this.router.navigate(['/editarMedico'], { queryParams: { id, nombre, apellido, direccion, telefono, fecha_nac } });
    this.obtenerMedico(this.medico.id);
  }

}
