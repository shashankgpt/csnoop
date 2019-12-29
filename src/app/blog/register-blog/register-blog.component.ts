import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup,FormArray } from '@angular/forms';
import * as fromBlog from '../state';
import * as BlogActions from '../state/blog.action';
import { Store } from '@ngrx/store';
import { IBlogReg, IBlog } from '../dataTypes';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-register-blog',
  templateUrl: './register-blog.component.html',
  styleUrls: ['./register-blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterBlogComponent implements OnInit {
  head = 'Register Blog';
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  orderForm: FormGroup;
items: FormArray;
formGroup : FormGroup;
  form: FormArray;
  @ViewChild('stepper',{static: false}) stepper: MatStepper;
  registerFormGroup1 = new FormGroup({
    blogId: new FormControl('', [Validators.required]),
    blogName: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
  });
  registerFormGroup2 = new FormGroup({
    blogHeading: new FormControl('', [Validators.required]),
    details: new FormControl('', [Validators.required]),
    tags: new FormControl('', [Validators.required]),
  });
  hide = true;
  componentActive = true;
  constructor(private store: Store<fromBlog.State>,private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      cont :new FormControl('', [Validators.required]),
      blogId: new FormControl('', [Validators.required]),
      blogName: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      form : this.formBuilder.array([this.init2()])
    })
    //this.addItem();
  }
  init(){
    return this.formBuilder.group({
      cont :new FormControl('', [Validators.required]),
      blogId: new FormControl('', [Validators.required]),
      blogName: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
    })
  }
  init2(){
    return this.formBuilder.group({
      cont :new FormControl('', [Validators.required]),
      blogHeading: new FormControl('', [Validators.required]),
      details: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),
    })
  }

  addItem(){
    this.form = this.formGroup.get('form') as FormArray;
    this.form.push(this.init2());
  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      description: '',
      price: ''
    });
  }
  // addItem(): void {
  //   this.items = this.orderForm.get('items') as FormArray;
  //   this.items.push(this.createItem());
  // }
  get f() {
    return this.registerFormGroup1.controls;
  }
  get f2() {
    return this.registerFormGroup2.controls;
  }
  get f3() {
    return this.orderForm.controls;
  }

goBack(stepper: MatStepper){
    stepper.previous();
    this.formGroup.statusChanges.subscribe(
      status => {
        if (status === 'VALID') {
          this.stepper.next();
        }
  console.log(status);
}
)
}

goForward(stepper: MatStepper){
  stepper.next();
  this.formGroup.statusChanges.subscribe(
    status => {
      if (status === 'VALID') {

      }
console.log(status);
}
)
}
ngOnDestroy() {
  this.componentActive = false;
}
onSubmit() {
  // console.log(this.f.email);
  const { blogId, blogName, category,author } = this.registerFormGroup1.value;
  console.log()
  const { blogHeading, details, tags } = this.registerFormGroup2.value;
  const blog: IBlog[] =[ {
    blogHeading,
    details,
    pageNo:"1"
  }];
  const reg: IBlogReg = {
    blogId,
    blogName,
    category,
    tags,
    blog,
    author:'shanky',
    userName:'shanky',
    flagged:false,
    active:true,
    details
  };
  this.store.dispatch(new BlogActions.RegisterBlog(reg));
}
}
