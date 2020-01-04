import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import * as fromAuth from '../state';
import * as AuthActions from '../state/auth.action';
import { Store } from '@ngrx/store';
import { IRegister } from '../dataTypes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {
  head = 'Register';
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwordForm: new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    })
  });
  hide = true;
  componentActive = true;
  constructor(private store: Store<fromAuth.State>) { }

  ngOnInit() {
  }

  get f() {
    return this.registerForm.controls;
  }

  get f2() {
    return ( this.f.passwordForm as FormGroup).controls;
  }

  onSubmit() {
    console.log(this.f.email);
    const { email, username, passwordForm } = this.registerForm.value;
    const reg: IRegister = {
      email,
      username,
      password: passwordForm.password
    };
    this.store.dispatch(new AuthActions.RegisterUser(reg));
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}

