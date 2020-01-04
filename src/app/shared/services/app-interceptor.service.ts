import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry, tap, takeWhile } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromShared from '../state';
import * as SharedActions from '../state/shared.action';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService implements HttpInterceptor {
  private throwErrorMsg;
  private disableSpinner;
  componentActive = true;
  retry = 1;
  constructor(private shareStore: Store<fromShared.State>) {
    this.throwErrorMsg = (error => {
      console.log(error.error.Message);
      this.deactivateSpinner();
      throw new Error(error.error.Message);
    });
    this.disableSpinner = (el => {
      this.deactivateSpinner();
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.ActivateSpinner();
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
        retry(this.retry),
        tap({
          next: val => {},
          error: error => {
            this.deactivateSpinner();
          },
          complete: () => this.deactivateSpinner()
        }),
        catchError(this.throwErrorMsg)
      );
    }
    return next.handle(req).pipe(
      retry(this.retry),
      tap(this.disableSpinner),
      catchError(this.throwErrorMsg)
    );
  }
 deactivateSpinner() {
    return;
    this.shareStore.pipe(select(fromShared.Spinner),
  takeWhile(() => this.componentActive)).subscribe((message) => {
    if (message) {
      this.shareStore.dispatch(new SharedActions.DeactivateSpinner());
    }
  });
 }

 ActivateSpinner() {
   return;
   this.shareStore.dispatch(new SharedActions.ActivateSpinner());
  }
}
