import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const AUTH_API = '/api/zonas/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class ZonasService {

  constructor(private http: HttpClient) { }

  getZonas(): Observable<any> {
    return this.http.get(AUTH_API);
  }

  agregarZona(pais: string, departamento: string, localidad: string): Observable<any> {
    return this.http.post(AUTH_API, {
      pais,
      departamento,
      localidad
    },httpOptions);
  }

  getZonasPaginacion(size: number, page: number): Observable<any> {
    return this.http.get(AUTH_API + 'paginacion?size='+size+'&page='+page, httpOptions);
  }

  getZonasBusqueda(filter: string, size: number, page: number): Observable<any>{
    return this.http.get(AUTH_API + 'busqueda?filter='+ filter + '&size='+ size +'&page='+page, httpOptions);
  }

  actualizarZona(id: number, pais: string, departamento: string, localidad: string): Observable<any> {
    return this.http.put(AUTH_API + id, {
      pais,
      departamento,
      localidad
    },httpOptions);
  }

  eliminarZona(id: number): Observable<any> {
    return this.http.delete(AUTH_API + id,httpOptions);
  }

}
