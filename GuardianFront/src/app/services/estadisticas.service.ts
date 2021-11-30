import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = '/api/estadisticas/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor(private http: HttpClient) { }

  obtenerHorasMedicos(fechainicio?: string, fechafin?: string): Observable<any> {
    return this.http.get(AUTH_API + `horas?fechainicio=${fechainicio}&fechafin=${fechafin}`);
  }

  obtenerHorariosFavoritos(fechainicio?: string, fechafin?: string): Observable<any> {
    return this.http.get(AUTH_API + `horariosfavoritos?fechainicio=${fechainicio}&fechafin=${fechafin}`);
  }

  obtenerCantidadEventualidades(fechainicio?: string, fechafin?: string): Observable<any> {
    return this.http.get(AUTH_API + `eventualidades?fechainicio=${fechainicio}&fechafin=${fechafin}` );
  }

}
