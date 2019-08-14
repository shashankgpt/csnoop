import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
import * as fromShared from '../../shared/state';
import * as fromAuth from '../state';
import * as AuthActions from '../state/auth.action';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { ISnackbar } from 'src/app/user/dataTypes';
import { IRegister } from '../dataTypes';
import { Router } from '@angular/router';
import * as SharedActions from '../../shared/state/shared.action';

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
  constructor(private authService: AuthService, private snackBar: MatSnackBar, private store: Store<fromAuth.State>
    ,         private shareStore: Store<fromShared.State>, private router: Router) { }

  ngOnInit() {
  }
  openSnackBar(msg, action) {
    this.snackBar.open(msg, action, {
      duration: 2000,
    });
  }

  get f() {
    return this.registerForm.controls;
  }
  get f2() {
    // TO DO: need to fix
    return this.registerForm.controls.passwordForm['controls'];
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
    // this.subscribeUserMessage();
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
}

