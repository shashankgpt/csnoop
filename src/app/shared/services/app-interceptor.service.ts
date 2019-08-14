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
    //  const errorMsg = this.configHandler.handleError(error);
    //  this.shareStore.dispatch({
    //   type: 'SPINNER_ACTIVATE',
    //   payload: false
    // });
     this.shareStore.dispatch(new SharedActions.DeactivateSpinner());
     throw new Error('hello');
   });
    this.disableSpinner = (el => {
      this.shareStore.pipe(select(fromShared.Spinner),
      takeWhile(() => this.componentActive)).subscribe((message) => {
        if (message) {
        // this.shareStore.dispatch(new SharedActions.DeactivateSpinner());
        }
      });

  });
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.shareStore.dispatch(new SharedActions.ActivateSpinner());
    // setTimeout(() => {
    //   this.shareStore.dispatch(new SharedActions.DeactivateSpinner());
    // }, 2000);
    // this.shareStore.dispatch(new SharedActions.DeactivateSpinner());
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
        // tap(el => this.shareStore.dispatch(new SharedActions.DeactivateSpinner())),
        catchError(this.throwErrorMsg)
      );
    }
    return next.handle(req).pipe(
        retry(3),
        tap(this.disableSpinner),
        catchError(this.throwErrorMsg)
      );
  }

}
