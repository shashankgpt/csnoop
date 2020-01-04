import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthCheckService {

  constructor() { }
  getCookie() {
    if (localStorage.getItem ('login')) {
      return localStorage.getItem ('login');
    }
    return '0';
  }
  isLoggedIn() {
    if (localStorage.getItem ('login')) {
      return true;
    }
    return false;
  }
}
