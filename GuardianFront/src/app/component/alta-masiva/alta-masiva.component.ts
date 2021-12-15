import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CsvService } from 'src/app/services/csv.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-alta-masiva',
  templateUrl: './alta-masiva.component.html',
  styleUrls: ['./alta-masiva.component.scss']
})
export class AltaMasivaComponent implements OnInit {

  @Input() rutaAltaMasiva?: string;
  @Input() rutaArchivo?: string;


  selectedFiles?: FileList  = undefined;
  currentFile?: File;
  progress = 0;
  message = '';
  okmessage='';
  enabled?: boolean = false;
  ruta?: string;
  archivoNombre?: string;

  fileInfos?: Observable<any>;

  constructor(private csvService: CsvService,public router: Router) {
  }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.archivoNombre = event.target.files[0].name;
  }

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.csvService.upload(this.currentFile,this.rutaAltaMasiva!).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.okmessage = event.body.message;
            }
            this.selectedFiles = undefined;
          },
          (err: any) => {
            this.okmessage = '';
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } 
            else {
              this.message = 'Error al procesar el archivo, verifique que sea un archivo csv';
            }
            this.currentFile = undefined;
            this.selectedFiles = undefined;
          });
      }
      this.selectedFiles = undefined;
    }
  }

  download():void{
    this.csvService.getFiles(this.rutaArchivo!).subscribe(data=>{
      this.enabled = true;
      this.ruta = environment.BACKEND_URL + data;
    },err=>{
      this.router.navigate(['/component/error']);
    });
  }
}
