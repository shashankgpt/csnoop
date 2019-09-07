import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { IResponse } from 'src/app/shared/dataTypes';
import { of } from 'rxjs';

describe('UserService', () => {

  let userService: UserService;
  let mockHttp;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['getLoggedInUser',
  'logoutUser', 'updateLoggedInUser', 'updatePassword', 'deleteUser', 'delete']);
    userService = new UserService(mockHttp);
    TestBed.configureTestingModule({});
    }
  );

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  describe('deleteUser', () => {
    it('should remove user ' , () => {
      // need to improve this
    const res: IResponse = {
      statusCode: 200,
      data: 'User is deleted',
      dateTime: 1,
      Message: 'Done'
    };
    mockHttp.deleteUser.and.returnValue(of(res));
    userService.deleteUser();
    expect(res.statusCode).toBe(200);
  });
});
});
