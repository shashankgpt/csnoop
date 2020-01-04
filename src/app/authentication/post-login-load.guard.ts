import { Injectable } from '@angular/core';
import { Route, UrlSegment } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthCheckService} from '../auth/services/auth-check.service';

@Injectable({
  providedIn: 'root'
})
export class PostLoginLoadGuard implements CanLoad  {
  constructor(private authCheckService: AuthCheckService) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.authCheckService.isLoggedIn();
  }

}
