import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const AUTH_API = '/api/login/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient) { }

  getSalas(): Observable<any> {
    return this.http.get(AUTH_API);
  }

 login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API, {
      email,
      password,
      },httpOptions);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(AUTH_API +"forgot-password", {
      email
      },httpOptions);
  }

  changePassword(newPassword: string, newPasswordVerification: string, token: string): Observable<any>{
    return this.http.put(AUTH_API+"change-password/" + token, {
      newPassword,
      newPasswordVerification
      },httpOptions);
  }

}
