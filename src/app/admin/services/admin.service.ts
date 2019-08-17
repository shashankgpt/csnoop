import { Injectable } from '@angular/core';
import { BaseRouteService } from '../../shared/services/base-route.service';
import { IResponse } from '../../shared/dataTypes';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private baseRoute: BaseRouteService) { }

  getAllUsers() {
    return this.baseRoute.get<IResponse>('user', {});
  }
}
