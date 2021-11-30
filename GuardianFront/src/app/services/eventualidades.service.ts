import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = '/api/eventualidades/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class EventualidadesService {

  constructor(private http: HttpClient) { }

  obtenerEventualidades(): Observable<any> {
    return this.http.get(AUTH_API);
  }

  postularse(idev:number):Observable<any>{
    return this.http.post(AUTH_API+ 'postularse/', {
      idev
    },httpOptions);
  }
}
