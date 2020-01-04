import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild  } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthCheckService} from '../auth/services/auth-check.service';

@Injectable({
  providedIn: 'root'
})
export class PostLoginChildGuard implements CanActivateChild  {
  constructor(private authCheckService: AuthCheckService) {}
  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot):
     boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.authCheckService.isLoggedIn();
  }

}
