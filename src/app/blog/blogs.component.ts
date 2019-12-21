import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IBlogReg,IBlog } from './dataTypes';
import { Store, select } from '@ngrx/store';
import * as fromBlog from './state';
import { Router } from '@angular/router';
import * as BlogActions from './state/blog.action';
import { takeWhile } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as fromShared from '../shared/state';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BlogsComponent implements OnInit, OnDestroy {
  componentActive = true;
  head = 'All Blogs';
  error = '';
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
        console.log("blogs",blogs)
        if (blogs[0].blogId) {
          this.dataSource = of(blogs);
          this.cd.detectChanges();
        }
      });
  }
  moveToEdit() {
    this.router.navigate(['/user/edit']);
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
  // lockUser(user: IProfileAdmin) {
  //   if (user.lock) {
  //     this.store.dispatch(new AdminActions.UnlockUser(user.username));
  //     return true;
  //   }
  //   this.store.dispatch(new AdminActions.LockUser(user.username));
  // }
  // activeUser(user: IProfileAdmin) {
  //   if (user.active) {
  //     this.store.dispatch(new AdminActions.DeactivateUser(user.username));
  //     return true;
  //   }
  //   this.store.dispatch(new AdminActions.ActivateUser(user.username));
  // }
  loadAllBlogs() {
    this.store.dispatch(new BlogActions.LoadAllBlog());
  }
  // moveToEditUser(user: IProfileAdmin) {
  //   this.store.dispatch(new AdminActions.SetActiveUsername(user.username));
  //   this.router.navigate([`admin/editUser/${user.username}`]);
  // }
}

