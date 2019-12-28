import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import * as fromBlog from '../state';
import * as BlogActions from '../state/blog.action';
import { Store } from '@ngrx/store';
import { IBlogReg } from '../dataTypes';
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
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  get f() {
    return this.registerFormGroup1.controls;
  }
  get f2() {
    return this.registerFormGroup2.controls;
  }

goBack(stepper: MatStepper){
    stepper.previous();
}

goForward(stepper: MatStepper){
    stepper.next();
}
}
