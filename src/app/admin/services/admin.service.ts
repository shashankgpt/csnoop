import { Injectable } from '@angular/core';
import { BaseRouteService } from '../../shared/services/base-route.service';
import { IResponse } from '../../shared/dataTypes';
import { IProfile } from 'src/app/user/dataTypes';
import { IProfileExtended } from 'src/app/user/dataTypes/profile';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private baseRoute: BaseRouteService) { }

  getAllUsers() {
    return this.baseRoute.get<IResponse>('admin/listOfUser', {});
  }
  lockUser(userName: string) {
    return this.baseRoute.patch<IResponse, object>(`admin/lockUser/${userName}`, {});
  }
  unlockUser(userName: string) {
    return this.baseRoute.patch<IResponse, object>(`admin/unlockUser/${userName}`, {});
  }
  activateUser(userName: string) {
    return this.baseRoute.patch<IResponse, object>(`admin/activateUser/${userName}`, {});
  }
  deactivateUser(userName: string) {
    return this.baseRoute.patch<IResponse, object>(`admin/deactivateUser/${userName}`, {});
  }
  updateUser(userProfile: IProfileExtended) {
    return this.baseRoute.put<IResponse, IProfile>(`admin/${userProfile.username}`, userProfile.profile);
  }
  deleteUser(userName: string) {
    return this.baseRoute.delete<IResponse>(`admin/${userName}`, {});
  }
}
