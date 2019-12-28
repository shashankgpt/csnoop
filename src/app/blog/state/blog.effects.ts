import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { BlogService } from '../services/blog.service';
import * as BlogActions from './blog.action';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { IResponse } from 'src/app/shared/dataTypes';
import { of } from 'rxjs';
import { IBlogReg } from '../dataTypes';

@Injectable()
export class BlogEffects {
  constructor(private actions$: Actions, private blogService: BlogService) { }
  @Effect()
  registerBlog$ = this.actions$.pipe(
    ofType(BlogActions.blogActionTypes.RegisterBlog),
    map((action: BlogActions.RegisterBlog) => action.payload),
    mergeMap((blog: IBlogReg) => this.blogService.registerBlog(blog).pipe(
      map((res: IResponse) => new BlogActions.RegisterBlogSuccess(res)),
      catchError(err => of(new BlogActions.RegisterBlogFail('Unable to register Blog'))))));

  @Effect()
  loadAllBlogs$ = this.actions$.pipe(
    ofType(BlogActions.blogActionTypes.LoadAllBlog),
    exhaustMap((action: BlogActions.LoadAllBlog) => this.blogService.getAllBlogs().pipe(
      map((res: IResponse) => new BlogActions.LoadAllBlogSuccess(res.data.blogs)),
      catchError(err => of(new BlogActions.LoadAllBlogFail('Unable to load All Blog'))))));
  @Effect()
    loadBlog$ = this.actions$.pipe(
      ofType(BlogActions.blogActionTypes.LoadBlog),
      map((action: BlogActions.LoadBlog) => action.payload),
      mergeMap((blogId: string) => this.blogService.loadBlog(blogId).pipe(
        map((res: IResponse) => new BlogActions.LoadBlogSuccess(res)),
        catchError(err => of(new BlogActions.LoadBlogFail('Unable to Load Blog-'+ blogId))))));


  @Effect()
  FlaggedBlog$ = this.actions$.pipe(
    ofType(BlogActions.blogActionTypes.FlaggedBlog),
    map((action: BlogActions.FlaggedBlog) => action.payload),
    mergeMap((blogID: string) => this.blogService.flaggedBlog(blogID).pipe(
      map((res: IResponse) => new BlogActions.FlaggedBlogSuccess(res)),
      catchError(err => of(new BlogActions.FlaggedBlogFail('Unable to flagged Blog -' + blogID))))));

  @Effect()
  unFlaggedBlog$ = this.actions$.pipe(
    ofType(BlogActions.blogActionTypes.UnFlaggedBlog),
    map((action: BlogActions.UnFlaggedBlog) => action.payload),
    mergeMap((blogID: string) => this.blogService.unFlaggedBlog(blogID).pipe(
      map((res: IResponse) => new BlogActions.UnFlaggedBlogSuccess(res)),
      catchError(err => of(new BlogActions.UnFlaggedBlogFail('Unable to un flagged Blog -' + blogID))))));

  @Effect()
  activateBlog$ = this.actions$.pipe(
    ofType(BlogActions.blogActionTypes.ActivateBlog),
    map((action: BlogActions.ActivateBlog) => action.payload),
    mergeMap((blogID: string) => this.blogService.activeBlog(blogID).pipe(
      map((res: IResponse) => new BlogActions.ActivateBlogSuccess(res)),
      catchError(err => of(new BlogActions.ActivateBlogFail('Unable to activate Blog -' + blogID))))));

  @Effect()
  deactivateBlog$ = this.actions$.pipe(
    ofType(BlogActions.blogActionTypes.DeactivateBlog),
    map((action: BlogActions.DeactivateBlog) => action.payload),
    mergeMap((blogID: string) => this.blogService.deactiveBlog(blogID).pipe(
      map((res: IResponse) => new BlogActions.DeactivateBlogSuccess(res)),
      catchError(err => of(new BlogActions.DeactivateBlogFail('Unable to deactivate Blog -' + blogID))))));

  @Effect()
  updateBlog$ = this.actions$.pipe(
    ofType(BlogActions.blogActionTypes.UpdateBlog),
    map((action: BlogActions.UpdateBlog) => action.payload),
    mergeMap((blog: IBlogReg) => this.blogService.updateBlog(blog).pipe(
      map((res: IResponse) => new BlogActions.UpdateBlogSuccess(res)),
      catchError(err => of(new BlogActions.UpdateBlogFail('Unable to deactivate Blog -' + blog.blogName))))));

  @Effect()
  deleteBlog$ = this.actions$.pipe(
    ofType(BlogActions.blogActionTypes.DeleteBlog),
    map((action: BlogActions.DeleteBlog) => action.payload),
    mergeMap((BlogID: string) => this.blogService.deleteBlog(BlogID).pipe(
      map((res: IResponse) => new BlogActions.DeleteBlogSuccess(res)),
      catchError(err => of(new BlogActions.DeleteBlogFail('Unable to Delete Blog -' + BlogID))))));

}
