import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = '/api/especialidades/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class EspecialidadesService {

  constructor(private http: HttpClient) { }

  getEspecialidades(): Observable<any> {
    return this.http.get(AUTH_API);
  }

  getEspecialidadesPaginacion(size: number, page: number): Observable<any>{
    return this.http.get(AUTH_API + 'paginacion?size='+size+'&page='+page, httpOptions);
  }

  agregarEspecialidad(nombre: string): Observable<any> {
    return this.http.post(AUTH_API, {
      nombre
    },httpOptions);
  }

  actualizarEspecialidad(id: number, nombre: string): Observable<any> {
    return this.http.put(AUTH_API + id, {
      nombre
    },httpOptions);
  }

  eliminarEspecialidad(id: number): Observable<any> {
    return this.http.delete(AUTH_API + id,httpOptions);
  }

  getEspecialidadesBusqueda(filter: string, size: number, page: number): Observable<any>{
    return this.http.get(AUTH_API + 'busqueda?filter='+ filter + '&size='+ size +'&page='+page, httpOptions);
  }
}
