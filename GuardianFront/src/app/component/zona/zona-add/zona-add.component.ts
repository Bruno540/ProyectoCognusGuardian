import { Component, OnInit } from '@angular/core';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import { ZonasService } from 'src/app/services/zonas.service';

@Component({
  selector: 'app-zona-add',
  templateUrl: './zona-add.component.html',
  styleUrls: ['./zona-add.component.scss']
})
export class ZonaAddComponent implements OnInit {

  constructor(private zonaService : ZonasService, private handleError: HandleErrorsService) { }

  form: any = {
    pais: null,
    departamento: null,
    localidad: null
  };

  tipos: any[] = [];

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { pais, departamento, localidad } = this.form;
    this.zonaService.agregarZona(pais, departamento, localidad).subscribe( data =>{
      this.handleError.showSuccessAlert(data.message);
      this.form={};
    }, err=>{
      this.handleError.showErrors(err);
    });
  }

}
