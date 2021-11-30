import { Component, OnInit } from '@angular/core';
import { EventualidadesService } from 'src/app/services/eventualidades.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-eventualidad',
  templateUrl: './eventualidad.component.html',
  styleUrls: ['./eventualidad.component.scss']
})
export class EventualidadComponent implements OnInit {

  medicoid?: any;
  eventualidades?: any[];
  page = 1;
  pageSize = 4;
  collectionSize!: number;
  isError?: false;
  constructor(private eventualidadService: EventualidadesService, private tokenStorage: TokenStorageService, private handleError: HandleErrorsService) { }

  ngOnInit(): void {
    this.medicoid = this.tokenStorage.getUserName();
    this.getEventualidades();
  }

  getEventualidades():void{
    this.eventualidadService.obtenerEventualidades().subscribe(data=>{
      this.eventualidades=data;
    })
  }

  postularse(idev:number):void{
    this.eventualidadService.postularse(idev).subscribe(data=>{
      this.handleError.showSuccessAlert(data.message);
      this.getEventualidades();
    }, err=>{
      this.handleError.showErrors(err);
      this.getEventualidades();
    });
  }

}
