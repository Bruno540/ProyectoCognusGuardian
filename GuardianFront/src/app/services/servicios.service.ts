import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const AUTH_API = '/api/servicios/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class ServiciosService {

  constructor(private http: HttpClient) { }

  getServiciosLocal(): Observable<any> {
    return this.http.get(AUTH_API  + '/local');
  }

  getServiciosDomicilio(): Observable<any> {
    return this.http.get(AUTH_API + '/domicilio');
  }

  agregarServicio(idtipo: number, especialidades: any[], idedificio: number, idubicacion: number): Observable<any> {
    return this.http.post(AUTH_API, {
      idtipo,
      especialidades,
      idedificio,
      idubicacion
      },httpOptions);
  }

  agregarServicioDomicilio(especialidades: any[], idzona: number): Observable<any> {
    return this.http.post(AUTH_API + '/domicilio', {
      especialidades,
      idzona
      },httpOptions);
  }

  getServiciosZona(idzona: number): Observable<any> {
    return this.http.get(AUTH_API + '/zona/' + idzona);
  }

  getServicio(idservicio: number): Observable<any> {
    return this.http.get(AUTH_API + idservicio);
  }

  getServiciosLocalesPaginacion(size: number, page: number): Observable<any>{
    return this.http.get(AUTH_API + '/local/paginacion?size='+size+'&page='+page, httpOptions);
  }

  getServiciosDomicilioPaginacion(size: number, page: number): Observable<any>{
    return this.http.get(AUTH_API + '/domicilio/paginacion?size='+size+'&page='+page, httpOptions);
  }

  getGuardiasServicio(id: number): Observable<any> {
    return this.http.get(AUTH_API + '/guardias/' + id);
  }

  actualizarServicioLocal(id:number, idtipo: number, cant_medicos: string, duracion: number, idedificio: number, idubicacion: number): Observable<any> {
    return this.http.put(AUTH_API + '/local/' + id, {
      idtipo,
      cant_medicos,
      duracion,
      idedificio,
      idubicacion,
      },httpOptions);
  }
  
  getServicioBusqueda(filter: string, size: number, page: number): Observable<any>{
    return this.http.get(AUTH_API + 'local/busqueda?filter='+ filter + '&size='+ size +'&page='+page, httpOptions);
  }

  getGuardiasServicioBusqueda(idservicio: any, filter: string, size: number, page: number): Observable<any>{
    return this.http.get(AUTH_API + 'local/guardias/busqueda?id=' + idservicio + '&filter='+ filter + '&size='+ size +'&page='+page, httpOptions);
  }

  getGuardiasServicioPaginacion(id: number, size: number, page: number): Observable<any> {
    return this.http.get(AUTH_API + 'local/guardias/paginacion?id=' + id + '&size='+ size +'&page='+page, httpOptions);
  }

  eliminarServicio(id:any):Observable<any>{
    return this.http.delete(AUTH_API + id, httpOptions);
  }

  eliminarServicioDom(id:any):Observable<any>{
    return this.http.delete(AUTH_API + 'domicilio/' + id, httpOptions);
  }

}
