import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IBlogReg,IBlog } from '../dataTypes';
import { Store, select } from '@ngrx/store';
import * as fromBlog from '../state';
import { Router, ActivatedRoute } from '@angular/router';
import * as BlogActions from '../state/blog.action';
import { takeWhile } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as fromShared from '../../shared/state';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  isEditable = false;
  componentActive = true;
  head = 'Blog Details';
  blogReg: IBlogReg;
  filteredProfile: IBlogReg;
  updateProfile: IBlogReg;
  error = '';
  errorMessage$: Observable<string>;
  blog: string;
  blogForm = new FormGroup({
    blogName: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });
  blogFormDetails = new FormGroup({
    blogHeading: new FormControl('', [Validators.required]),
    details: new FormControl('', [Validators.required]),
    pageNo: new FormControl('', [Validators.required]),
  });
  constructor(private store: Store<fromBlog.State>, private shareStore: Store<fromShared.State>, private router: Router,
              private cd: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {
    this.store.pipe(select(fromBlog.getActiveBlogID),
      takeWhile(() => this.componentActive)).subscribe((blog) => {
        this.blogReg = blog;
        this.cd.detectChanges();
        console.log("myblog",this.blogReg);
        this.f.blogName.setValue (blog.blogName);
        this.f.category.setValue (blog.category);
        if (!blog) {
          if (this.route.snapshot.paramMap.has('blogId')) {
            this.blog = this.route.snapshot.paramMap.get('blogId');
           // this.getBlog(this.blog);
          }

          //this.moveToAllUsers();
        }
      });
  }
  get f() {
    return this.blogForm.controls;
  }
  get f2() {
    return this.blogFormDetails.controls;
  }
  goBack(stepper: MatStepper){
    stepper.previous();
}

goForward(stepper: MatStepper){
    stepper.next();
}
  moveToAllUsers() {
    this.router.navigate(['/admin/allUsers']);
  }
  // onSubmit() {
  //   const profile: IProfile = {
  //     firstName: this.profileForm.value.firstName,
  //     lastName: this.profileForm.value.lastName,
  //     email: this.profileForm.value.email,
  //     gender: this.profileForm.value.gender,
  //     location: this.profileForm.value.location,
  //     website: this.profileForm.value.website
  //   };
  //   const p: IProfileExtended = { username: this.blog, profile: { ...profile } };
  //   this.store.dispatch(new AdminActions.UpdateUser(p));

  // }
  delete() {
    this.store.dispatch(new BlogActions.DeleteBlog(this.blog));
  }
  // killAllSessions() {
  //   this.store.dispatch(new AdminActions.LogoutUser(this.blog));
  // }
  getBlog(blogId: string) {
    this.store.dispatch(new BlogActions.LoadBlog(blogId));
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
  onSubmit() {
    // console.log(this.f.email);
    const { blogName, category } = this.blogForm.value;
    const { blogHeading, details, pageNo } = this.blogFormDetails.value;
    const blogVal: IBlog = {
      blogHeading,
      details,
      pageNo,
    };
    let blog = this.blogReg.blog;
    blog.push(blogVal);
    this.blogReg.blogName = blogName;
    this.blogReg.category = category;
    this.blogReg.blog = blog ;
    this.blogReg.details = "test" ;
    this.store.dispatch(new BlogActions.UpdateBlog(this.blogReg));
  }
}


