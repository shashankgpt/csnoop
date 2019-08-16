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
  retry = 1;
  constructor(private http: HttpClient,
              private router: Router,
              private configHandler: ConfigHandlerService) {
    this.throwErrorMsg = (error => {
      // console.log(error);
      throw new error('Base Url Service Issue');
      // const errorMsg = this.configHandler.handleError(error);
    });
  }

  get<T>(url: string, paramVal: any): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${url}`).pipe(
      retry(this.retry),
      catchError(this.throwErrorMsg)
    );
  }

  post<T1, T2>(url: string, paramVal: T2, header: any = {}): Observable<T1> {
    return this.http.post<T1>(`${this.apiUrl}/${url}`, paramVal, header)
      .pipe(
        retry(this.retry),
        catchError(this.throwErrorMsg)
      );
  }

  put<T1, T2>(url: string, paramVal: T2, header: any = {}): Observable<T1> {
    return this.http.put<any>(`${this.apiUrl}/${url}`, paramVal, header)
      .pipe(
        retry(this.retry),
        catchError(this.throwErrorMsg)
      );
  }
  patch<T1, T2>(url: string, paramVal: T2, header: any = {}): Observable<T1> {
    return this.http.patch<T1>(`${this.apiUrl}/${url}`, paramVal, header)
      .pipe(
        retry(this.retry),
        catchError(this.throwErrorMsg)
      );
  }
  delete<T>(url: string, paramVal: any): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${url}`)
      .pipe(
        retry(this.retry),
        catchError(this.throwErrorMsg)
      );
  }
}
