import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const AUTH_API = '/api/guardias/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class GuardiasService {

  constructor(private http: HttpClient) { }

  getGuardias(): Observable<any> {
    return this.http.get(AUTH_API);
  }

  getGuardia(id:number): Observable<any> {
    return this.http.get(AUTH_API + id);
  }


  getGuardiasFecha(fecha: string, rango:string): Observable<any> {
    return this.http.get(AUTH_API + `filter/fecha?fecha=${fecha}&rango=${rango}`);
  }


 agregarGuardia(descripcion: string, fechainicio: string, idservicio: number, duracion: number): Observable<any> {
    return this.http.post(AUTH_API, {
      descripcion,
      fechainicio,
      idservicio,
      duracion
      },httpOptions);
  }

  actualizarGuardia(id: number | string , fechainicio: string, fechafin: string): Observable<any> {
    return this.http.put(AUTH_API + id, {
      fechainicio,
      fechafin
      },httpOptions);
  }

  eliminarGuardia(id: number): Observable<any> {
    return this.http.delete(AUTH_API + id,httpOptions);
  }

  getGuardiasPaginacion(size: number, page: number): Observable<any>{
    return this.http.get(AUTH_API + '/paginacion?size='+size+'&page='+page, httpOptions);
  }

  asignarMedicosGuardia(idguardia: number, idmedicos: number[]): Observable<any> {
    return this.http.post(AUTH_API + 'medicos/'+ idguardia, {
      idmedicos
    },httpOptions);
  }
  obtenerMedicosAsignados(idguardia: number): Observable<any> {
    return this.http.get(AUTH_API  + 'medicosasign/' + idguardia, httpOptions);
  }

  obtenerMedicosPostulados(idguardia: number): Observable<any> {
    return this.http.get(AUTH_API  + 'medicospostu/' + idguardia, httpOptions);
  }

  quitarAsignMedico(idguardia: number, idmedico: number): Observable<any> {
    return this.http.post(AUTH_API + 'quitarasign/', {
      idguardia,
      idmedico
    },httpOptions);
  }

  publicarGuardia(idguardia: number): Observable<any> {
    return this.http.post(AUTH_API + 'publicar/'+ idguardia,httpOptions);
  }

  obtenerCuposFaltantes(idguardia: number): Observable<any> {
    return this.http.get(AUTH_API  + 'cuposfaltantes/' + idguardia, httpOptions);
  }

  cerrarGuardia(idguardia: number): Observable<any> {
    return this.http.post(AUTH_API + 'cerrar/'+ idguardia,httpOptions);
  }
  
}
