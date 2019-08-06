import { Injectable } from '@angular/core';
import { BaseRouteService } from '../../shared/services/base-route.service';
import { IResponse } from '../../shared/dataTypes';
import { HttpHeaders } from '@angular/common/http';
import { IProfile, IPasswordChange } from '../dataTypes';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private baseRoute: BaseRouteService) { }

  getLoggedInUser() {
    return this.baseRoute.get<IResponse>('user', {});
  }
  updateLoggedInUser(username: string, profile: IProfile) {
    return this.baseRoute.put<IResponse, IProfile>('user', profile);
  }
  updatePassword(password: IPasswordChange) {
    return this.baseRoute.patch<IResponse, IPasswordChange >('user/updatePassword', password);
  }
  deleteUser(username: string) {
    return this.baseRoute.delete<IResponse>(`user/${username}`, {});
  }
}
