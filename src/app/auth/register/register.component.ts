import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import * as fromAuth from '../state';
import * as AuthActions from '../state/auth.action';
import { Store, select } from '@ngrx/store';
import { IRegister } from '../dataTypes';
import * as fromShared from '../../shared/state';
import { takeWhile } from 'rxjs/operators';
import * as SharedActions from '../../shared/state/shared.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {
  head = 'Register';
  loading = false;
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
  constructor(private store: Store<fromAuth.State>, private sharedStore: Store<fromShared.State>,private cd: ChangeDetectorRef,) { }

  ngOnInit() {
    this.sharedStore.pipe(select(fromShared.BtnSpinner),
      takeWhile(() => this.componentActive)).subscribe((activate) => {
        this.loading = activate;
        this.cd.detectChanges();
      });
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
    this.sharedStore.dispatch(new SharedActions.ActivateBtnSpinner());
    this.store.dispatch(new AuthActions.RegisterUser(reg));
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}

