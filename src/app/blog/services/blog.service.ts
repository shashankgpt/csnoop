import { Injectable } from '@angular/core';
import { BaseRouteService } from '../../shared/services/base-route.service';
import { IResponse } from '../../shared/dataTypes';
import {IBlog, IBlogReg, IBlogCheck} from '../dataTypes';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private baseRoute: BaseRouteService) { }

  getAllBlogs() {
    return this.baseRoute.get<IResponse>('blog', {});
  }
  activeBlog(BlogId: string) {
    return this.baseRoute.patch<IResponse, object>(`blog/activate/${BlogId}`, {});
  }
  deactiveBlog(BlogId: string) {
    return this.baseRoute.patch<IResponse, object>(`blog/deactivate/${BlogId}`, {});
  }
  flaggedBlog(BlogId: string) {
    return this.baseRoute.patch<IResponse, object>(`blog/activate/${BlogId}`, {});
  }
  unFlaggedBlog(BlogId: string) {
    return this.baseRoute.patch<IResponse, object>(`blog/activate/${BlogId}`, {});
  }
  updateBlog(BlogProfile: IBlogReg) {
    return this.baseRoute.put<IResponse, IBlogReg>(`blog/${BlogProfile.blogId}`, BlogProfile);
  }
  checkBlog(Blog: IBlogCheck) {
    return this.baseRoute.post<IResponse, IBlogCheck>(`blog/existBlogName`, Blog);
  }
  deleteBlog(BlogId: string) {
    return this.baseRoute.delete<IResponse>(`blog/deleteBlogId/${BlogId}`, {});
  }
  loadBlog(BlogId: string) {
    return this.baseRoute.get<IResponse>(`blog/${BlogId}`, {});
  }
  registerBlog(blog: IBlogReg) {
    return this.baseRoute.post<IResponse, object>(`blog`, blog);
  }
}
