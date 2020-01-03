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
import { FormGroup, Validators, FormControl,FormArray,FormBuilder } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent implements OnInit, OnDestroy {
  isEditable = false;
  componentActive = true;
  head = 'Blog Details';
  blogReg: IBlogReg;
  filteredProfile: IBlogReg;
  updateProfile: IBlogReg;
  error = '';
  errorMessage$: Observable<string>;
  blog: string;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  orderForm: FormGroup;
items: FormArray;
formGroup : FormGroup;
  form: FormArray;
  blogForm = new FormGroup({
    blogName: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });
  blogFormDetails = new FormGroup({
    blogHeading: new FormControl('', [Validators.required]),
    details: new FormControl('', [Validators.required]),
    pageNo: new FormControl('', [Validators.required]),
  });
  constructor(private store: Store<fromBlog.State>,private formBuilder: FormBuilder, private shareStore: Store<fromShared.State>, private router: Router,
              private cd: ChangeDetectorRef, private route: ActivatedRoute) { }
              addItem(head,details){
                this.form = this.formGroup.get('form') as FormArray;
                this.form.push(this.init2(head,details));
              }
              init2(head,details){
                return this.formBuilder.group({
                  cont :new FormControl('', [Validators.required]),
                  blogHeading: new FormControl(head, [Validators.required]),
                  details: new FormControl(details, [Validators.required]),
                  tags: new FormControl('', [Validators.required]),
                })
              }
              get formsValue(){
                return this.formGroup.get('form') as FormArray;
              }
  ngOnInit() {

    this.store.pipe(select(fromBlog.getActiveBlogID),
      takeWhile(() => this.componentActive)).subscribe((blog) => {
        this.blogReg = blog;
        console.log("myblog",blog);
        this.formGroup = this.formBuilder.group({
          form : this.formBuilder.array([this.init2(blog.blog[0].blogHeading,blog.blog[0].details)])
        })
        for(let i=0;i<(blog.blog.length-1);i++){
          this.addItem(blog.blog[i+1].blogHeading,blog.blog[i+1].details);
        }
        this.f.blogName.setValue (blog.blogName);
        this.f.category.setValue (blog.category);
        if (!blog) {
          if (this.route.snapshot.paramMap.has('blogId')) {
            this.blog = this.route.snapshot.paramMap.get('blogId');
            this.getBlog(this.blog);
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
  fetchFormVal():IBlog[]{
    //alert(this.formsValue.length);
     const { blogHeading, details, tags } = this.blogForm.value;

     console.log(this.formsValue.at(0));
     const blog: IBlog[] =[ ];
     for(let i =0;i<this.formsValue.length;i++){
       if(this.formsValue.at(i).value.blogHeading){
       blog.push({
         blogHeading: this.formsValue.at(i).value.blogHeading,
         details: this.formsValue.at(i).value.details,
         pageNo: i+1,
       })
     }
     }
     return blog;
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
    const blog = this.fetchFormVal()

    //let blog = this.blogReg.blog;
    //blog.push(blogVal);
    this.blogReg.blogName = blogName;
    this.blogReg.category = category;
    this.blogReg.blog = blog ;
    this.blogReg.details = "test" ;
    this.store.dispatch(new BlogActions.UpdateBlog(this.blogReg));
  }
}


