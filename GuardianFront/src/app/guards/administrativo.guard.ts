import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdministrativoGuard implements CanActivate {

  constructor(private tokenStorage: TokenStorageService, private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const role = this.tokenStorage.getRoleName();
    if(role && role==="ADMINISTRATIVO"){
      return true;
    }
    this.router.navigate(['/component/home']);
    return false;
  }
  
}
