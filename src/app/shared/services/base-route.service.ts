import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError, retry } from 'rxjs/operators';
import { of as observableOf, Observable, throwError } from 'rxjs';
import { ConfigHandlerService } from './config-handler.service';
@Injectable({
  providedIn: 'root'
})
export class BaseRouteService {
  private apiUrl = 'http://localhost:3000';
  private throwErrorMsg;

  constructor(private http: HttpClient,
    private router: Router,
    private configHandler: ConfigHandlerService) {
    this.throwErrorMsg = (error => {
      const errorMsg = this.configHandler.handleError(error);
    });
  }

  get<T>(url: string, paramVal: any): Observable<HttpResponse<T>> {
    return this.http.get<T>(`${this.apiUrl}/${url}`)
      .pipe(
        retry(3),
        catchError(this.throwErrorMsg)
      );
  }

  post<T1, T2>(url: string, paramVal: T2, header: any= {}): Observable<T1> {
    return this.http.post<any>(`${this.apiUrl}/${url}`, paramVal, header)
      .pipe(
        retry(3),
        catchError(this.throwErrorMsg)
      );
  }
}
