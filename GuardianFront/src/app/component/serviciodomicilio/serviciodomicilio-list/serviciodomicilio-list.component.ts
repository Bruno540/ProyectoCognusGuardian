import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-serviciodomicilio-list',
  templateUrl: './serviciodomicilio-list.component.html',
  styleUrls: ['./serviciodomicilio-list.component.scss']
})
export class ServiciodomicilioListComponent implements OnInit {

  servicios?: any[];
  serviciosFiltrados$!: Observable<any[]>;

  page = 1;
  pageSize = 5;
  collectionSize!: number;

  filter = new FormControl('');

  constructor(private serviciosService: ServiciosService,private pipe: DecimalPipe,public router: Router, private handleError: HandleErrorsService) { }

  ngOnInit(): void {
    this.serviciosService.getServiciosDomicilioPaginacion(this.pageSize, this.page).subscribe(data=>{
      this.servicios=data.rows;
      this.collectionSize=data.count;
      this.serviciosFiltrados$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(text, this.pipe))
      );
    });
  }
 
  refresh() {
    this.serviciosService.getServiciosDomicilioPaginacion(this.pageSize, this.page).subscribe(data=>{
      this.servicios=data.rows;
      this.collectionSize=data.count;
      this.serviciosFiltrados$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(text, this.pipe))
      );
    });
  }

  search(text: string, pipe: PipeTransform): any[] {
    if(this.servicios!==undefined){
      return this.servicios.filter(country => {
        const term = text.toLowerCase();
        return country.Zona.pais.toLowerCase().includes(term)
            || pipe.transform(country.Servicio.cant_medicos).includes(term)
            || pipe.transform(country.Servicio.duracion).includes(term)
            || country.Zona.ciudad.toLowerCase().includes(term)
            || country.Zona.barrio.toLowerCase().includes(term);
      });
    }
    else{
      return [];
    }
  } 

  verGuardias(idservicio: any){
    this.router.navigate(['/component/guardias'], { queryParams: { idservicio } });
  }

  verDetalles(idedificio: any){
    this.router.navigate(['/component/servicio'], { queryParams: { idedificio } });
  }

  eliminar(id:any){
    this.handleError.showConfirmDelete().then(data=>{
      if(data.isConfirmed){
        this.serviciosService.eliminarServicioDom(id).subscribe(data=>{
          this.handleError.showSuccessAlert(data.message);
          this.refresh();
        },err=>{
          this.handleError.showErrors(err);
          this.refresh();
        })
      }
    })
  }
}
