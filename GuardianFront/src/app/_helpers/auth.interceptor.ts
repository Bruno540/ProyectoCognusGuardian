import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';


import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { environment } from 'src/environments/environment.prod';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {

  constructor(private token: TokenStorageService, private spinner: NgxSpinnerService, public router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    authReq = req.clone({ url: `${environment.BACKEND_URL}${req.url}`, headers: req.headers.set(TOKEN_HEADER_KEY, 'bearer ' + token)});
    if (token != null) {
      const helper = new JwtHelperService();
      if(helper.isTokenExpired(token)){
        this.token.deleteToken();
        this.token.signOut();
        this.router.navigate(['/component/login']).then(()=>window.location.reload());
      }
    }
    if(!authReq.url.includes('filter')){
      this.spinner.show();
    }
    return next.handle(authReq).pipe(
      finalize(() => {
          this.spinner.hide();
      })
    )
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
];
