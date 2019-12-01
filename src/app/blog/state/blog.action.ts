import { Action } from '@ngrx/store';
import { IBlog,IBlogReg } from '../dataTypes';
import { IResponse } from 'src/app/shared/dataTypes';

export enum blogActionTypes {
  SetActiveBlog = '[Blog] Set Active Blog',
  LoadAllBlog = '[Blog] Load All Blog',
  LoadAllBlogSuccess = '[Blog] Load All Blog Success',
  LoadAllBlogFail = '[Blog] Load All Blog Fail',
  FlaggedBlog = '[Blog] Flagged Blog',
  FlaggedBlogSuccess = '[Blog] Flagged Blog Success',
  FlaggedBlogFail = '[Blog] Flagged Blog Fail',
  UnFlaggedBlog = '[Blog] UnFlagged Blog',
  UnFlaggedBlogSuccess = '[Admin Api] UnFlagged Blog Success',
  UnFlaggedBlogFail = '[Admin Api] UnFlagged Blog Fail',
  ActivateBlog = '[Admin Api] Activate Blog',
  ActivateBlogSuccess = '[Admin Api] Activate Blog Success',
  ActivateBlogFail = '[Admin Api] Activate Blog Fail',
  DeactivateBlog = '[Admin Api] deactivate Blog',
  DeactivateBlogSuccess = '[Admin Api] deactivate Blog Success',
  DeactivateBlogFail = '[Admin Api] deactivate Blog Fail',
  UpdateBlog = '[Admin Api] Update Blog',
  UpdateBlogSuccess = '[Admin Api] Update Blog Success',
  UpdateBlogFail = '[Admin Api] Update Blog Fail',
  DeleteBlog = '[Admin Api] Delete Blog',
  DeleteBlogSuccess = '[Admin Api] Delete Blog Success',
  DeleteBlogFail = '[Admin Api] Delete Blog Fail',
  LogoutBlog = '[Admin Api] Logout Blog',
  LogoutBlogSuccess = '[Admin Api] Logout Blog Success',
  LogoutBlogFail = '[Admin Api] Logout Blog Fail',
}

export class SetActiveBlogname implements Action {
  readonly type = blogActionTypes.SetActiveBlog;
  constructor(public payload: string) { }
}

export class LoadAllBlog implements Action {
  readonly type = blogActionTypes.LoadAllBlog;
}

export class LoadAllBlogSuccess implements Action {
  readonly type = blogActionTypes.LoadAllBlogSuccess;
  constructor(public payload: IBlogReg[]) {}
}

export class LoadAllBlogFail implements Action {
  readonly type = blogActionTypes.LoadAllBlogFail;
  constructor(public payload: string) { }
}

export class FlaggedBlog implements Action {
  readonly type = blogActionTypes.FlaggedBlog;
  constructor(public payload: string) { }
}

export class FlaggedBlogSuccess implements Action {
  readonly type = blogActionTypes.FlaggedBlogSuccess;
  constructor(public payload: IResponse) {}
}

export class FlaggedBlogFail implements Action {
  readonly type = blogActionTypes.FlaggedBlogFail;
  constructor(public payload: string) { }
}
export class UnFlaggedBlog implements Action {
  readonly type = blogActionTypes.UnFlaggedBlog;
  constructor(public payload: string) { }
}

export class UnFlaggedBlogSuccess implements Action {
  readonly type = blogActionTypes.UnFlaggedBlogSuccess;
  constructor(public payload: IResponse) {}
}

export class UnFlaggedBlogFail implements Action {
  readonly type = blogActionTypes.UnFlaggedBlogFail;
  constructor(public payload: string) { }
}

export class ActivateBlog implements Action {
  readonly type = blogActionTypes.ActivateBlog;
  constructor(public payload: string) { }
}

export class ActivateBlogSuccess implements Action {
  readonly type = blogActionTypes.ActivateBlogSuccess;
  constructor(public payload: IResponse) {}
}

export class ActivateBlogFail implements Action {
  readonly type = blogActionTypes.ActivateBlogFail;
  constructor(public payload: string) { }
}
export class DeactivateBlog implements Action {
  readonly type = blogActionTypes.DeactivateBlog;
  constructor(public payload: string) { }
}

export class DeactivateBlogSuccess implements Action {
  readonly type = blogActionTypes.DeactivateBlogSuccess;
  constructor(public payload: IResponse) {}
}

export class DeactivateBlogFail implements Action {
  readonly type = blogActionTypes.DeactivateBlogFail;
  constructor(public payload: string) { }
}
export class UpdateBlog implements Action {
  readonly type = blogActionTypes.UpdateBlog;
  constructor(public payload: IBlogReg) { }
}

export class UpdateBlogSuccess implements Action {
  readonly type = blogActionTypes.UpdateBlogSuccess;
  constructor(public payload: IResponse) {}
}

export class UpdateBlogFail implements Action {
  readonly type = blogActionTypes.UpdateBlogFail;
  constructor(public payload: string) { }
}

export class DeleteBlog implements Action {
  readonly type = blogActionTypes.DeleteBlog;
  constructor(public payload: string) { }
}

export class DeleteBlogSuccess implements Action {
  readonly type = blogActionTypes.DeleteBlogSuccess;
  constructor(public payload: IResponse) {}
}

export class DeleteBlogFail implements Action {
  readonly type = blogActionTypes.DeleteBlogFail;
  constructor(public payload: string) { }
}

export class LogoutBlog implements Action {
  readonly type = blogActionTypes.LogoutBlog;
  constructor(public payload: string) { }
}

export class LogoutBlogSuccess implements Action {
  readonly type = blogActionTypes.LogoutBlogSuccess;
  constructor(public payload: IResponse) {}
}

export class LogoutBlogFail implements Action {
  readonly type = blogActionTypes.LogoutBlogFail;
  constructor(public payload: string) { }
}


export type BlogActions = SetActiveBlogname |
LoadAllBlog |
LoadAllBlogSuccess |
LoadAllBlogFail |
FlaggedBlog |
FlaggedBlogSuccess |
FlaggedBlogFail |
UnFlaggedBlog |
UnFlaggedBlogSuccess |
UnFlaggedBlogFail |
ActivateBlog |
ActivateBlogSuccess |
ActivateBlogFail |
DeactivateBlog |
DeactivateBlogSuccess |
DeactivateBlogFail |
UpdateBlog |
UpdateBlogSuccess |
UpdateBlogFail |
DeleteBlog |
DeleteBlogSuccess |
DeleteBlogFail |
LogoutBlog |
LogoutBlogSuccess |
LogoutBlogFail;

