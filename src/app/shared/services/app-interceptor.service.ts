import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigHandlerService } from './config-handler.service';
import { catchError, retry, tap, takeWhile } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromShared from '../state';
import { ISnackbar } from 'src/app/user/dataTypes/snackbar';
import * as SharedActions from '../state/shared.action';
@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService implements HttpInterceptor {
  private throwErrorMsg;
  private disableSpinner;
  componentActive = true;
  constructor(private configHandler: ConfigHandlerService, private store: Store<any>,
              private shareStore: Store<fromShared.State>) {
    this.throwErrorMsg = (error => {
      console.log(error.error.Message);
      this.shareStore.dispatch(new SharedActions.DeactivateSpinner());
      throw new Error(error.error.Message);
    });
    this.disableSpinner = (el => {
      this.deactivateSpinner();
    });
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.shareStore.dispatch(new SharedActions.ActivateSpinner());
    setTimeout(() => {
      this.shareStore.pipe(select(fromShared.Spinner),
      takeWhile(() => this.componentActive)).subscribe((message) => {
        if (message) {
          this.deactivateSpinner();
        }
      });
    }, 2000);
    if (localStorage.getItem('login')) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('login')}`
      });

      const clone = req.clone({
        headers
      });
      return next.handle(clone).pipe(
        retry(3),
        tap({
          next: val => {
            // on next 11, etc.
            // console.log('on next', val);
          },
          error: error => {
            console.log(error);
            this.deactivateSpinner();
          },
          complete: () => this.deactivateSpinner()
        }),
        catchError(this.throwErrorMsg)
      );
    }
    return next.handle(req).pipe(
      retry(3),
      tap(this.disableSpinner),
      catchError(this.throwErrorMsg)
    );
  }
 deactivateSpinner() {
  this.shareStore.pipe(select(fromShared.Spinner),
  takeWhile(() => this.componentActive)).subscribe((message) => {
    if (message) {
      this.shareStore.dispatch(new SharedActions.DeactivateSpinner());
    }
  });
 }
}
