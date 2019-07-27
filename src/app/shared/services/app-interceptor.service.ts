import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigHandlerService } from './config-handler.service';
import { catchError, retry } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService implements HttpInterceptor {
  private throwErrorMsg;
  constructor(private configHandler: ConfigHandlerService,private store: Store<any>) {
    this.throwErrorMsg = (error => {
     console.log(error);
     const errorMsg = this.configHandler.handleError(error);
   });
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.store.pipe(select('authentications')).subscribe(
    //   authentications => {
    //     alert('my token12');
    //     alert('my token23'+ authentications.tokenCodeValue);
    //   });
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
