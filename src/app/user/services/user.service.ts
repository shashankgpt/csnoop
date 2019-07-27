import { Injectable } from '@angular/core';
import { BaseRouteService } from '../../shared/services/base-route.service';
import { IResponse } from '../../shared/dataTypes';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private baseRoute: BaseRouteService) { }

  getLoggedInUser() {
    return this.baseRoute.get<IResponse>('user', {});
  }
}
