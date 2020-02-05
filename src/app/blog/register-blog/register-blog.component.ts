import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import * as fromBlog from '../state';
import * as BlogActions from '../state/blog.action';
import { Store, select } from '@ngrx/store';
import { IBlogReg, IBlog, IBlogCheck } from '../dataTypes';
import { MatStepper } from '@angular/material/stepper';
import { takeWhile } from 'rxjs/operators';
import * as fromShared from '../../shared/state';

@Component({
  selector: 'app-register-blog',
  templateUrl: './register-blog.component.html',
  styleUrls: ['./register-blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterBlogComponent implements OnInit, OnDestroy {
  creator:string;
  head = 'Register Blog';
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  orderForm: FormGroup;
items: FormArray;
formGroup: FormGroup;
  form: FormArray;
  isEditable = false;
  showPage = true;
  registerFormGroup1 = new FormGroup({
    blogId: new FormControl('', [Validators.required]),
    blogName: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    tags: new FormControl('', [Validators.required]),
  });
  registerFormGroup2 = new FormGroup({
    blogHeading: new FormControl('', [Validators.required]),
    details: new FormControl('', [Validators.required]),

  });
  hide = true;
  componentActive = true;
  constructor(private store: Store<fromBlog.State>, private sharedStore: Store<fromShared.State>,private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.sharedStore.pipe(select(fromShared.getLoggedUserName),
    takeWhile(() => this.componentActive)).subscribe((userName) => {
      this.creator = userName;
    });
    this.formGroup = this.formBuilder.group({
      form : this.formBuilder.array([this.init2()])
    });
  }
  addItem() {
    this.form = this.formGroup.get('form') as FormArray;
    this.form.push(this.init2());
  }
  init2() {
    return this.formBuilder.group({
      cont : new FormControl('', [Validators.required]),
      blogHeading: new FormControl('', [Validators.required]),
      details: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),
    });
  }
  get f() {
    return this.registerFormGroup1.controls;
  }
  get f2() {
    return this.registerFormGroup2.controls;
  }
  get formsValue() {
    return this.formGroup.get('form') as FormArray;
  }
  fetchFormVal(): IBlog[] {
   // alert(this.formsValue.length);
    const { blogHeading, details, tags } = this.registerFormGroup2.value;

    console.log(this.formsValue.at(0));
    const blog: IBlog[] = [ {
      blogHeading,
      details,
      pageNo: 1
    }];
    for (let i = 0; i < this.formsValue.length; i++) {
      if (this.formsValue.at(i).value.blogHeading) {
      blog.push({
        blogHeading: this.formsValue.at(i).value.blogHeading,
        details: this.formsValue.at(i).value.details,
        pageNo: i + 2,
      });
    }
    }
    return blog;
  }
goBack(stepper: MatStepper) {
    stepper.previous();
}

goForward(stepper: MatStepper) {
  const { blogId, blogName } = this.registerFormGroup1.value;
  const checkName: IBlogCheck = {
    blogId,
    blogName
  }
  this.store.dispatch(new BlogActions.CheckNameBlogExist(checkName));
    //stepper.next();
  this.store.pipe(select(fromBlog.getCheckBlogID),
      takeWhile(() => this.componentActive)).subscribe((message) => {
          if(message) {stepper.next();}
      });
}
ngOnDestroy() {
  this.componentActive = false;
}
onSubmit() {
  // console.log(this.f.email);
  const { blogId, blogName, category, author, detail } = this.registerFormGroup1.value;
  const { blogHeading, details, tags } = this.registerFormGroup2.value;
  const blog = this.fetchFormVal();


  const reg: IBlogReg = {
    blogId,
    blogName,
    category,
    tags,
    blog,
    author,
    userName: this.creator,
    flagged: false,
    active: true,
    details: detail
  };
  console.log('rehistra', reg);
  // return;
  this.store.dispatch(new BlogActions.RegisterBlog(reg));
}
}
