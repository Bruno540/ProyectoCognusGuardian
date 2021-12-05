import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const AUTH_API = '/api/medico/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class AccionesMedicoService {

  constructor(private http: HttpClient) { }

  obtenerDatos(): Observable<any> {
    return this.http.get(AUTH_API+'datos');
  }

  obtenerGuardias(): Observable<any> {
    return this.http.get(AUTH_API+'guardias');
  }

  obtenerGuardiasDisponibles(): Observable<any> {
    return this.http.get(AUTH_API+'guardiasdisponibles');
  }

  obtenerGuardiasCompletadas(fechainicio: string, fechafin:string): Observable<any> {
    return this.http.get(AUTH_API+'guardiascompletadas' + `?fechainicio=${fechainicio}&fechafin=${fechafin}`);
  }

  obtenerPostulaciones(): Observable<any> {
    return this.http.get(AUTH_API+'guardiaspostuladas');
  }

  postularseGuardia(idguardia: number, idesp: number): Observable<any> {
    return this.http.post(AUTH_API + 'postularse/'+idguardia,{
      idesp
    },httpOptions);
  }

  cancelarPostulacion(idguardia: number): Observable<any> {
    return this.http.post(AUTH_API + 'cancelarpostulacion/'+idguardia,httpOptions);
  }

  getEspecialidadesGuardia(idguardia: number): Observable<any> {
    return this.http.get(AUTH_API  + 'especialidades/' + idguardia, httpOptions);
  }

  ofrecerliberar(idguardia: number):Observable<any>{
    return this.http.post(AUTH_API + 'liberar/'+ idguardia,httpOptions);
  }

  editarMedico(direccion: string, fecha_nac: string, nombre: string, apellido: string, telefono: string, file: File): Observable<any>{
    const formData: FormData = new FormData();
    if(file!=null){
      formData.append('file', file, file.name);
    }
    formData.append('direccion', direccion)
    formData.append('nombre', nombre)
    formData.append('telefono', telefono)
    formData.append('fecha_nac', fecha_nac)
    formData.append('apellido', apellido)
    const req = new HttpRequest('put', AUTH_API, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  sincronizarCalendario(): Observable<any> {
    return this.http.post(AUTH_API + 'sincronizarCalendar',httpOptions);
  }

  quitarSincronizacionCalendario(): Observable<any> {
    return this.http.post(AUTH_API + 'quitcalendarsync',httpOptions);
  }

  ckCalendar(): Observable<any> {
    return this.http.post(AUTH_API + 'ckcalendar',httpOptions);
  }


  confirmarSincronizacionCalendario(code:string,idmedico: number): Observable<any> {
    return this.http.post(AUTH_API + 'confirmarSyncCalendar',{
      code,
      idmedico
    },httpOptions);
  }

  resetPassword(newPassword: string, newPasswordVerification: string): Observable<any> {
    return this.http.post(AUTH_API + 'password/change',{
      newPassword,
      newPasswordVerification
    },httpOptions);
  }
}
