import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {Subject} from 'rxjs';
import {endOfDay, isSameDay, isSameMonth, startOfDay} from 'date-fns';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {GuardiasService} from '../../../services/guardias.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  black:{
    primary: '#000000',
    secondary: '#000000',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

@Component({
  selector: 'app-asignarguardia',
  templateUrl: './asignarguardia.component.html',
  styleUrls: ['./asignarguardia.component.scss']
})
export class AsignarguardiaComponent implements OnInit {

  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  CalendarView = CalendarView;

  especialidades?: any[];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [

  ];

  cuposFaltantes?: any[];

  activeDayIsOpen = true;

  modalData!: {
    action: string;
    event: CalendarEvent;
  };


  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  medicospostulados?: any[];
  medicosasignados?: any[];
  guardias?: any[];
  selectedguardia?: any;
  guardia?:any;
  servicio?:any;
  locale: string = "es";
  colordash?:any;

  title = 'ng-bootstrap-modal-demo';
  closeResult!: string;
  public isCollapsed = true;
  modalOptions: NgbModalOptions;

  constructor(private serviciosService: ServiciosService,public router: Router, private guardiasService: GuardiasService,private route: ActivatedRoute, private modalService: NgbModal, private handleError: HandleErrorsService) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    };
    registerLocaleData(localeEs);
  }


  refreshGuardia(){
    this.getGuardia(this.guardia.id);
  }

  getGuardia(idguardia: number){
    this.guardiasService.getGuardia(idguardia).subscribe(data=>{
      this.guardia = data;
      this.serviciosService.getServicio(this.guardia.idservicio).subscribe(data=>{
        this.servicio=data;
        this.actualizarMedicos();
      });
    },err=>{
      this.router.navigate(['/component/error']);
    });
  }

  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const idguardia = params.idguardia;
      if(idguardia){
        this.getGuardia(idguardia);
      }
    });
    this.refreshPage();
  }

  open(content: any): void {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  refreshPage(){
    this.getGuardias(this.viewDate.toISOString(),this.view);
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen) ||
        events.length === 0);
      this.viewDate = date;
    }
  }

  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    if(event.id && newStart && newEnd){
      this.guardiasService.actualizarGuardia(event.id, newStart.toString(), newEnd.toString()).subscribe(data=>{
        this.handleError.showSuccessAlert(data.message)
        this.events = this.events.map((iEvent) => {
          if (iEvent === event) {
            return {
              ...event,
              start: newStart,
              end: newEnd,
            };
          }
          return iEvent;
        });
      },err=>{
        this.handleError.showErrors(err);
      });
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.selectedGuardia(event);
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
    this.getGuardias(this.viewDate.toISOString(),this.view)
  }
  changeColor(event: any){
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
    this.getGuardias(this.viewDate.toISOString(),this.view)
  }

  getGuardias(fecha:string ,rango:string){
    this.events=[];
    this.guardiasService.getGuardiasFecha(fecha,rango).subscribe(data=>{
      this.guardias = data;
      if (this.guardias){
        for(const guardia of this.guardias){
          if(guardia.estado === 'CERRADA'){
            this.colordash = colors.red;
          }
          if(guardia.estado ==='PUBLICADA'){
            this.colordash = colors.blue;
          }
          if(guardia.estado ==='PENDIENTE'){
            this.colordash = colors.yellow;
          }
          this.cargarGuardia(guardia,this.colordash)
        }
      }
      if(this.guardia){
        this.getGuardia(this.guardia.id);
      }
    });
  }

  publicarGuardia(): void{
    this.guardiasService.publicarGuardia(this.guardia.id).subscribe(data=>{
      this.getGuardia(this.guardia.id);
      this.handleError.showSuccessAlert(data.message);
    });
  }

  cargarGuardia(guardia:any,color:any){
    this.events = [
      ...this.events,
      {
        id: guardia.id,
        title: guardia.descripcion,
        start: new Date(guardia.fechainicio),
        end: new Date(guardia.fechafin),
        color: color,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  quitarAsignMedico(idmedico: number): void{
    this.guardiasService.quitarAsignMedico(this.guardia.id, idmedico).subscribe(data=>{
      this.actualizarMedicos();
    },err=>{
      this.handleError.showErrors(err);
    });
  }

  actualizarMedicos(): void{
    this.guardiasService.obtenerMedicosAsignados(this.guardia.id).subscribe(data2=>{
      this.medicosasignados=data2;
    });
    this.guardiasService.obtenerMedicosPostulados(this.guardia.id).subscribe(data=>{
      if(data){
        this.medicospostulados=data;
        this.medicospostulados!.sort((a, b) => (a.GuardiaMedicoPostulacion.ponderacion > b.GuardiaMedicoPostulacion.ponderacion ? -1 : 1)); 
      }
      else{
        this.medicospostulados=[];
      }
    });
    this.guardiasService.obtenerCuposFaltantes(this.guardia.id).subscribe(data=>{
      this.cuposFaltantes = data;
    });
  }

  selectedGuardia(event: any): void{
    this.selectedguardia=event;
    const guardiaActual = this.guardias?.filter(guardia=> guardia.id==event.id);
    this.guardia = guardiaActual![0];
    this.serviciosService.getServicio(guardiaActual![0].idservicio).subscribe(data=>{
      this.servicio=data;
    });
    this.especialidades = guardiaActual![0].Servicio!.Especialidads;
    this.actualizarMedicos();
  }

  agregarMedicosGuardia(): string{
    const medicospostulados: number[] = [];
    this.medicospostulados?.forEach(med=>{
      if(med.seleccionado){
        medicospostulados.push(med.idmedico);
      }
    });
    if(this.guardia){
      this.guardiasService.asignarMedicosGuardia(this.guardia.id,medicospostulados).subscribe(data=>{
        this.actualizarMedicos();
      }, error => {
        this.handleError.showErrors(error);
      });
    }
    return 'Save click';
  }

  reseteo():void{
    this.guardia = null;
    this.refreshPage();
  }

  cerrarGuardia(): void{
    this.handleError.showConfirmDelete("Una vez cerrada no podran realizarse cambios").then(data=>{
      if(data.isConfirmed){
        this.guardiasService.cerrarGuardia(this.guardia.id).subscribe(data=>{
          this.handleError.showSuccessAlert(data.message);
          this.getGuardias(this.viewDate.toISOString(), this.view)
        },err=>{
          this.handleError.showErrors(err);
        });
      }
    })
  }
}


