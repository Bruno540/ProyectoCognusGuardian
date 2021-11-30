import { Component, Input, OnInit } from '@angular/core';
// tslint:disable:typedef
import {
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { GuardiasService } from 'src/app/services/guardias.service';

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
import { HandleErrorsService } from 'src/app/services/handle.errors.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  locale: string = "es";

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

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
  ];

  isMedico = false;

  @Input() guardias: any;

  @Input() draggable: any = true;

  activeDayIsOpen = true;

  constructor(private guardiasService: GuardiasService, private handleError : HandleErrorsService) {
    registerLocaleData(localeEs);
  }
  ngOnInit(): void {
    if(!this.guardias){
      this.refreshPage();
    }
    else{
      this.isMedico = true;
      this.asignarGuardias();
    }
  }

  refreshPage(){
    this.getGuardias(this.viewDate.toISOString(),this.view);
  }

  getGuardias(fecha:string ,rango:string){
    if(!this.isMedico){
      this.events=[];
      this.guardiasService.getGuardiasFecha(fecha,rango).subscribe(data=>{
        this.guardias = data;
        if (this.guardias){
          this.asignarGuardias()
        }
      });
    }
  }

  getColor(guardia:any){
    if(guardia.estado === 'CERRADA'){
      return colors.red;
    }
    if(guardia.estado ==='PUBLICADA'){
      return  colors.blue;
    }
    if(guardia.estado ==='PENDIENTE'){
      return colors.yellow;
    }
  }

  asignarGuardias(){
    for(const guardia of this.guardias){
      const color = this.getColor(guardia);
      this.events = [
        ...this.events,
        {
          id: guardia.id,
          title: guardia.descripcion,
          start: new Date(guardia.fechainicio),
          end: new Date(guardia.fechafin),
          color: color,
          draggable: this.draggable,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen) ||
        events.length === 0);
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
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
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
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

  click(event: any){
    if(event.id && event.start && event.end){
      this.guardiasService.actualizarGuardia(event.id, event.start.toString(), event.end.toString()).subscribe();
    }
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
    this.getGuardias(this.viewDate.toISOString(),this.view)
  }

}
