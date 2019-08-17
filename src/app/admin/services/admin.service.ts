import { Injectable } from '@angular/core';
import { BaseRouteService } from '../../shared/services/base-route.service';
import { IResponse } from '../../shared/dataTypes';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private baseRoute: BaseRouteService) { }

  getAllUsers() {
    return this.baseRoute.get<IResponse>('admin/listOfUser', {});
  }
  lockUser(userName) {
    return this.baseRoute.patch<IResponse, object>(`admin/lockUser/${userName}`, {});
  }
  unlockUser(userName) {
    return this.baseRoute.patch<IResponse, object>(`admin/unlockUser/${userName}`, {});
  }
  activateUser(userName) {
    return this.baseRoute.patch<IResponse, object>(`admin/activateUser/${userName}`, {});
  }
  deactivateUser(userName) {
    return this.baseRoute.patch<IResponse, object>(`admin/deactivateUser/${userName}`, {});
  }
}
