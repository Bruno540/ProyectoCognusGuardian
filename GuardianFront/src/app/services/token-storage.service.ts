import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const ROLE_NAME = 'role';
const USER_NAME = '';
const USER_ID = '';
const EMAIL = 'email';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public deleteToken(): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(ROLE_NAME);
    window.sessionStorage.removeItem(USER_NAME);
  }


  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);

  }

  public saveRoleName(rol: string): void {
    window.sessionStorage.removeItem(ROLE_NAME);
    window.sessionStorage.setItem(ROLE_NAME, rol);
  }

  public getRoleName(): string | null {
    var tipo = window.sessionStorage.getItem(ROLE_NAME);
    if(!tipo){
      tipo='VISITANTE';
    }
    return tipo;
  }

  public saveUserName(username: string): void {
    window.sessionStorage.removeItem(USER_NAME);
    window.sessionStorage.setItem(USER_NAME, username);
  }

  public getUserName(): string | null {
    return window.sessionStorage.getItem(USER_NAME);
  }

  public saveEmail(username: string): void {
    window.sessionStorage.removeItem(EMAIL);
    window.sessionStorage.setItem(EMAIL, username);
  }

  public getEmail(): string | null {
    return window.sessionStorage.getItem(EMAIL);
  }

  public saveUserId(id: string): void {
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, id);
  }

  public getUserId(): string | null {
    return window.sessionStorage.getItem(USER_ID);
  }
}
