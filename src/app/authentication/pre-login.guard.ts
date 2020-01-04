import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthCheckService} from '../auth/services/auth-check.service';

@Injectable({
  providedIn: 'root'
})
export class PreLoginGuard implements   CanActivate  {
  constructor(private authCheckService: AuthCheckService) {}
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   return !this.authCheckService.isLoggedIn();
  }

}

