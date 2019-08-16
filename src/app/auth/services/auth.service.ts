import { Injectable } from '@angular/core';
import { BaseRouteService } from '../../shared/services/base-route.service';
import { IResponse } from '../../shared/dataTypes';
import { ILogin, IRegister } from '../dataTypes/index';
import { HttpHeaders } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
// import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private baseRoute: BaseRouteService, private store: Store<any>) {}

  login(username: string, password: string) {
    localStorage.clear();
    const auth = btoa(username + ':' + password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`
      })
    };
    return this.baseRoute.post<IResponse, object>('public/login', {}, httpOptions)
    /* .pipe(tap(gwt => {
      this.store.dispatch({
        type: 'TOKEN_CODE',
        payload: gwt.data.token
      });
    }))*/
    ;
  }

  register(username: string, password: string, email: string) {
    const User: IRegister = {username, password, email};
    return this.baseRoute.post<IResponse, IRegister>('public/register', User);
  }

}

