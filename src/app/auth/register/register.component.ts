import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
import * as fromShared from '../../shared/state/shared.reducer';
import * as fromAuth from '../state';
import * as AuthActions from '../state/auth.action';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { ISnackbar } from 'src/app/user/dataTypes';
import { IRegister } from '../dataTypes';
import { Router } from '@angular/router';

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
    return this.registerForm.controls.passwordForm.controls;
  }
  onSubmit() {
    console.log(this.f.email);
    const { email, username, passwordForm } = this.registerForm.value;
    const reg: IRegister = {
      email,
      username,
      password: passwordForm.password
    };
    console.log(passwordForm.password);
    this.store.dispatch(new AuthActions.RegisterUser(reg));
    this.subscribeUserMessage();
    // this.authService.register(username, passwordForm.password, email).subscribe(data => {
    //   this.openSnackBar(data.Message, 'Register');
    // });
  }
  subscribeUserMessage() {
    this.store.pipe(select(fromAuth.getAuthMessage),
      takeWhile(() => this.componentActive)).subscribe((response) => {
        if (response) {
        this.shareStore.dispatch({
          type: 'SPINNER_ACTIVATE',
          payload: false
        });
        if (response) {
          const snack1: ISnackbar = {
            snackBarActive: true,
            snackBarMessage: response,
            snackBarAction: 'Register'
          };
          this.shareStore.dispatch({
            type: 'SET_NOTIFY',
            payload: snack1
          });
        }
          // this.store.dispatch(new AuthActions.SetMessage(''));
          // this.cd.detectChanges();
        this.router.navigate(['/auth/login']);
        }

      });
    this.store.pipe(select(fromAuth.getAuthError),
      takeWhile(() => this.componentActive)).subscribe((error) => {
        if (error) {
          // need to be strong type
          const snack1: ISnackbar = {
            snackBarActive: true,
            snackBarMessage: error,
            snackBarAction: 'Edit'
          };
          this.shareStore.dispatch({
            type: 'SET_NOTIFY',
            payload: snack1
          });
          this.shareStore.dispatch({
            type: 'SPINNER_ACTIVATE',
            payload: false
          });
        }
      });
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
}

