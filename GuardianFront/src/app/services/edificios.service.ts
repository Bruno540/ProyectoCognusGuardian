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

export class EdificiosService {

  constructor(private http: HttpClient) { }

  getEdificios(): Observable<any> {
    return this.http.get(AUTH_API);
  }

 crearEdificio(direccion: string, nombre: string, telefono: string, file: File): Observable<any> {
  const formData: FormData = new FormData();
  if(file!=null){
    formData.append('file', file, file.name);
  }
  formData.append('direccion', direccion)
  formData.append('nombre', nombre)
  formData.append('telefono', telefono)
  
  const req = new HttpRequest('POST', AUTH_API, formData, {
    reportProgress: true,
    responseType: 'json'
  });

  return this.http.request(req);
  }

  obtenerUbicacionesEdificioPag(id: number,size: number, page: number): Observable<any>{
    return this.http.get(AUTH_API + '/ubicaciones/tools/paginacion?id='+id+'&size='+size+'&page='+page);
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
    return this.http.put(AUTH_API + id, {
      direccion,
      nombre,
      telefono
    }, httpOptions);
  }

  obtenerEdificiosBusqueda(filter: string,size: number, page: number): Observable<any> {
    return this.http.get(AUTH_API+'busqueda?filter='+filter+'&size='+size+'&page='+page);
  }

  obtenerEdificiosPaginacion(size: number, page: number): Observable<any> {
    return this.http.get(AUTH_API+'paginacion?size='+size+'&page='+page);
  }

  eliminarEdificio(id: number): Observable<any> {
    return this.http.delete(AUTH_API+id);
  }

}
