import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = '/api/tiposservicio/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class TiposServicioService {

  constructor(private http: HttpClient) { }

  getTipos(): Observable<any> {
    return this.http.get(AUTH_API);
  }

  agregarTipo(nombre: string): Observable<any> {
    return this.http.post(AUTH_API, {
      nombre,
    },httpOptions);
  }

  getTiposPaginacion(size: number, page: number): Observable<any> {
    return this.http.get(AUTH_API + 'paginacion?size='+size+'&page='+page, httpOptions);
  }

  getTipoServicioBusqueda(filter: string, size: number, page: number): Observable<any>{
    return this.http.get(AUTH_API + 'busqueda?filter='+ filter + '&size='+ size +'&page='+page, httpOptions);
  }

  actualizarTipoServicio(id: number, nombre: string): Observable<any> {
    return this.http.put(AUTH_API + id, {
      nombre,
    },httpOptions);
  }

  eliminarTipoServicio(id: number): Observable<any> {
    return this.http.delete(AUTH_API + id,httpOptions);
  }
}
