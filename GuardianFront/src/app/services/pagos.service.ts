import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = '/api/payment/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class PagosService {

  registeredSuscription: any;
  
  constructor(private http: HttpClient) { }


 crearSuscripcion(id: string, email: string, nombre: string, apellido: string, telefono: string, institucion: string): Observable<any> {
    return this.http.post(AUTH_API+'/createsuscription', {
        id,
        email,
        nombre,
        apellido,
        telefono,
        institucion
      },httpOptions);
  }

 verifySuscripcion(email: string, nombre: string, apellido: string, telefono: string, institucion: string): Observable<any> {
    return this.http.post(AUTH_API+'/verifysuscription', {
        email,
        nombre,
        apellido,
        telefono,
        institucion
      },httpOptions);
  }


  deleteSuscription(subID: string): Observable<any>{
    return this.http.post(AUTH_API+'/destroysuscription/'+subID, httpOptions);
  }

  getPlanId(): Observable<any>{
    return this.http.get(AUTH_API + 'planid', httpOptions);
  }

  autorizarPago(idsub: string): Observable<any> {
    return this.http.post(AUTH_API+'authorizepayment/', {
       idsub
      },httpOptions);
  }
  confirmarPago(orderId: string, email: string, nombre: string, apellido: string, telefono: string, institucion: string): Observable<any> {
    return this.http.post(AUTH_API+`execute-payment/${orderId}`, {
        email,
        nombre,
        apellido,
        telefono,
        institucion
      },httpOptions);
  }

  saveRegisteredSuscription(data: any): void{
    this.registeredSuscription=data;
  }

  getRegisteredSuscription(): void{
    return this.registeredSuscription;
  }

}
