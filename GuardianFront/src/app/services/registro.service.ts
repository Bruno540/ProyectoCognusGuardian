import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const AUTH_API = '/api/edificios/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class RegistroService {

  constructor(private http: HttpClient) { }

  getEdificios(): Observable<any> {
    return this.http.get(AUTH_API);
  }

 crearEdificio(direccion: string, nombre: string, telefono: string, file: File): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('file', file, file.name);
  formData.append('direccion', direccion)
  formData.append('nombre', nombre)
  formData.append('telefono', telefono)
  
  const req = new HttpRequest('POST', AUTH_API, formData, {
    reportProgress: true,
    responseType: 'json'
  });

  return this.http.request(req);
  }

  obtenerUbicacionesEdificio(id: number): Observable<any>{
    return this.http.get(AUTH_API + '/ubicaciones/' + id);
  }

  obtenerUbicacionesDisponibleEdificio(id: number): Observable<any>{
    return this.http.get(AUTH_API + '/ubicaciones/disponibles/' + id);
  }

  obtenerServiciosEdificio(id: number): Observable<any>{
    return this.http.get(AUTH_API + '/servicios/' + id, httpOptions);
  }

  obtenerEdificio(id: number): Observable<any>{
    return this.http.get(AUTH_API  + id);
  }

  editarEdificio(id: number, direccion: string, nombre: string, telefono: string): Observable<any>{
    return this.http.patch(AUTH_API + id, {
      direccion,
      nombre,
      telefono
    }, httpOptions);
  }

  obtenerEdificiosBusqueda(filter: string,size: number, page: number): Observable<any> {
    return this.http.get(AUTH_API+'tools/busqueda?filter='+filter+'&size='+size+'&page='+page);
  }

  obtenerEdificiosPaginacion(size: number, page: number): Observable<any> {
    return this.http.get(AUTH_API+'tools/paginacion?size='+size+'&page='+page);
  }


}
