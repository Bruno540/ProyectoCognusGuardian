import { Component, OnInit } from '@angular/core';
import { EdificiosService } from 'src/app/services/edificios.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';

@Component({
  selector: 'app-edificio-add',
  templateUrl: './edificio-add.component.html',
  styleUrls: ['./edificio-add.component.scss']
})
export class EdificioAddComponent implements OnInit {

  form: any = {
    direccion: null,
    nombre: null,
    telefono: null
  };

  currentFile!: File;

  constructor(private edificiosService: EdificiosService, private handleError: HandleErrorsService) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const { direccion, nombre, telefono } = this.form;
    this.edificiosService.crearEdificio(direccion, nombre, telefono, this.currentFile).subscribe( data =>{
      if(data.ok && data.body){
        this.form = {};
        this.handleError.showSuccessAlert(data.body.message);
      }
    },err=>{
      this.handleError.showErrors(err);
    });
  }

  selectFile(event: any): void {
    this.currentFile = event.target.files[0];
  }

}
