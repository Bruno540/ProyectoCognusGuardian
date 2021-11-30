import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const AUTH_API = '/api/administrativos/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class AdministrativosService {

  constructor(private http: HttpClient) { }

  getAdministrativos(): Observable<any> {
    return this.http.get(AUTH_API);
  }

 crearAdministrativo(email: string, nombre: string, apellido: string, telefono: string): Observable<any> {
    return this.http.post(AUTH_API, {
      email,
      nombre,
      apellido,
      telefono
      },httpOptions);
  }

  getAdministrativosPaginacion(size: number, page: number): Observable<any>{
    return this.http.get(AUTH_API + 'paginacion?size='+size+'&page='+page, httpOptions);
  }

  getAdministrativosBusqueda(filter: string, size: number, page: number): Observable<any>{
    return this.http.get(AUTH_API + 'busqueda?filter='+ filter + '&size='+ size +'&page='+page, httpOptions);
  }

  editarAdministrativo(id: number, apellido: string, nombre: string, telefono: string): Observable<any>{
    return this.http.put(AUTH_API + id, {
      apellido,
      nombre,
      telefono
    }, httpOptions);
  }

  obtenerAdministrativo(id: any): Observable<any>{
    return this.http.get(AUTH_API + id);
  }

  deleteAdministrativo(id: any): Observable<any>{
    return this.http.delete(AUTH_API + id, httpOptions);
  }

}
