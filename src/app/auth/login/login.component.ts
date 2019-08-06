import { ChangeDetectionStrategy,Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromShared from '../../shared/state/shared.reducer';
import * as fromAuth from '../state/authenticate.reducer';

import { ISnackbar } from 'src/app/user/dataTypes';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  value = 'Login';
  durationInSeconds = 5;
  spinner = false;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  hide = true;
  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router,
              private store: Store<fromAuth.State>, private shareStore: Store<fromShared.State>) { }
  get f() {
    return this.loginForm.controls;
  }
  openSnackBar(msg, action) {
    this.snackBar.open(msg, action, {
      duration: 2000,
    });
  }
  ngOnInit() {
  }
  onSubmit() {
    this.shareStore.dispatch({
      type: 'SPINNER_ACTIVATE',
      payload: true
    });

    this.authService.login(this.f.username.value, this.f.password.value).subscribe(resData => {
      this.shareStore.dispatch({
        type: 'LOGGED_IN',
        payload: true
      });
      this.shareStore.dispatch({
        type: 'SET_USERNAME',
        payload: this.f.username.value
      });
      this.store.pipe(select('authentications')).subscribe(
        authentications => {
          localStorage.setItem('login', authentications.tokenCodeValue);
          // this.openSnackBar(resData.Message, 'Login');
          const snack1: ISnackbar = {
            snackBarActive: true,
            snackBarMessage: resData.Message,
            snackBarAction: 'Login'
          };
          this.shareStore.dispatch({
            type: 'SET_NOTIFY',
            payload: snack1
          });
          this.shareStore.dispatch({
            type: 'SPINNER_ACTIVATE',
            payload: false
          });
          this.router.navigate(['/user/view']);
        }
      );
    });
  }

}
