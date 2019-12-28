import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IBlogReg,IBlog } from '../dataTypes';
import { Store, select } from '@ngrx/store';
import * as fromBlog from '../state';
import { Router } from '@angular/router';
import * as BlogActions from '../state/blog.action';
import { takeWhile } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as fromShared from '../../shared/state';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AllComponent implements OnInit, OnDestroy {
  componentActive = true;
  head = 'All Blogs';
  error = '';
  blogs:IBlogReg[];
  errorMessage$: Observable<string>;
  expandedElement: IBlog | null;
  columnsToDisplay: string[] = ['blogId', 'blogName', 'category', 'createdAt'];
  lock = false;
  dataSource: Observable<IBlogReg[]>;
  constructor(private store: Store<fromBlog.State>, private shareStore: Store<fromShared.State>, private router: Router
    ,         private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadAllBlogs();
    this.store.pipe(select(fromBlog.getBlogsData),
      takeWhile(() => this.componentActive)).subscribe((blogs) => {
        this.blogs = blogs;
        console.log("blogs",blogs)
        if (blogs[0].blogId) {
          this.dataSource = of(blogs);
          this.cd.detectChanges();
        }
      });
  }
  viewBlog(blog:IBlogReg){
    this.store.dispatch(new BlogActions.LoadBlog(blog.blogId));
    this.router.navigate([`blog/view/${blog.blogId}`]);
  }
  moveToEdit() {
    this.router.navigate(['/user/edit']);
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
  lockBlog(blog: IBlogReg) {
    if (blog.flagged) {
      this.store.dispatch(new BlogActions.UnFlaggedBlog(blog.blogId));
      return true;
    }
    this.store.dispatch(new BlogActions.FlaggedBlog(blog.blogId));
  }
  activeBlog(blog: IBlogReg) {
    //alert(blog.active);
    if (blog.active) {
      this.store.dispatch(new BlogActions.DeactivateBlog(blog.blogId));
      return true;
    }
    this.store.dispatch(new BlogActions.ActivateBlog(blog.blogId));
  }
  loadAllBlogs() {
    this.store.dispatch(new BlogActions.LoadAllBlog());
  }
  moveToEditBlog(blog: IBlogReg) {
    this.store.dispatch(new BlogActions.LoadBlog(blog.blogId));
    this.router.navigate([`blog/view/${blog.blogId}`]);
  }
}

