import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { EdificiosService } from 'src/app/services/edificios.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-edificio-list',
  templateUrl: './edificio-list.component.html',
  styleUrls: ['./edificio-list.component.scss']
})
export class EdificioListComponent implements OnInit {

  tipo: any;
  edificios?: any[];
  collectionSize!: number;
  page = 1;
  pageSize = 5;

  rutaAltaMasiva = "edificios"
  rutaArchivo = "Edificio"


  constructor(private edificiosService: EdificiosService, public router: Router,private tokenStorage: TokenStorageService, private handleError: HandleErrorsService, private componentFactoryResolver: ComponentFactoryResolver) { }

  @ViewChild('myContainer', { read: ViewContainerRef }) container: ViewContainerRef | undefined;
  
 

  async ngOnInit(){
    this.tipo=this.tokenStorage.getRoleName();
    this.getEdificios();
    const { EdificioAddComponent } = await import('../edificio-add/edificio-add.component');
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(EdificioAddComponent);
    const { instance } = this.container!.createComponent(componentFactory);
  }

  getEdificios(): void{
    this.edificiosService.obtenerEdificiosPaginacion(this.pageSize, this.page).subscribe(data=>{
      this.edificios=data.rows;
      this.collectionSize=data.count;
    });
  }

  verSalas(idedificio: any){
    this.router.navigate(['/component/ubicaciones'], { queryParams: { idedificio } });
  }

  verDetalles(idedificio: any){
    this.router.navigate(['/component/perfiledificio'], { queryParams: { idedificio } });
  }


  editOn(medico: any): void{
    medico.editable=!medico.editable;
  }

  onEnter(e: any): void{
    e.target.blur();
  }

  actualizarEdificio(edificio: any): void{
    this.edificiosService.editarEdificio(edificio.id, edificio.direccion, edificio.nombre, edificio.telefono).subscribe(data=>{
      this.handleError.showSuccessAlert(data.message);
    }, err=>{
      this.handleError.showErrors(err);
    });
    edificio.editable=false;
  }

  borrarEdificio(id: number){
    this.handleError.showConfirmDelete().then(data=>{
      if(data.isConfirmed){
        this.edificiosService.eliminarEdificio(id).subscribe(data=>{
          this.handleError.showSuccessAlert(data.message);
          this.refresh();
        },err=>{
          this.handleError.showErrors(err);
          this.refresh();
        })
      }
    })
  }


  busqueda(event: any): void{
    this.getEdificiosBusqueda(event.target.value);
  }
  getEdificiosBusqueda(filter: string): void{
    this.edificiosService.obtenerEdificiosBusqueda(filter, this.pageSize, this.page).subscribe(data=>{
      this.edificios=data.rows;
      this.collectionSize=data.count;
    });
  }

  refresh() {
    this.getEdificios();
  }

}
