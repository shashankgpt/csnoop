import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigHandlerService } from './config-handler.service';
import { catchError, retry } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromShared from '../state/shared.reducer';
import { ISnackbar } from 'src/app/user/dataTypes/snackbar';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService implements HttpInterceptor {
  private throwErrorMsg;
  constructor(private configHandler: ConfigHandlerService, private store: Store<any>,
              private shareStore: Store<fromShared.State>) {
    this.throwErrorMsg = (error => {
     console.log(error.error.Message);
     const errorMsg = this.configHandler.handleError(error);
     this.shareStore.dispatch({
      type: 'SPINNER_ACTIVATE',
      payload: false
    });
     const snack1: ISnackbar = {
      snackBarActive: true,
      snackBarMessage: error.error.Message ? error.error.Message : 'Connection Failed',
      snackBarAction: 'Login'
    };
     this.shareStore.dispatch({
      type: 'SET_NOTIFY',
      payload: snack1
    });
     throw new Error('hello');
   });
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('login')) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('login')}`
      });

      const clone = req.clone({
        headers
      });
     // alert("t1");
      return next.handle(clone).pipe(
        retry(3),
        catchError(this.throwErrorMsg)
      );
    }
    return next.handle(req).pipe(
        retry(3),
        catchError(this.throwErrorMsg)
      );
  }

}
