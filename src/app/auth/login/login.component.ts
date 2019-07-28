import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromAuth from '../../shared/state/shared.reducer';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  value = 'test2';
  durationInSeconds = 5;
  spinner = false;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  hide = true;
  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router,
              private store: Store<fromAuth.State>) { }
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
    this.authService.login(this.f.username.value, this.f.password.value).subscribe(resData => {
      const loginData = resData.data;
      this.store.dispatch({
        type: 'TOKEN_CODE',
        payload: loginData.token
      });
      this.store.dispatch({
        type: 'LOGGED_IN',
        payload: true
      });

      this.store.pipe(select('authentications')).subscribe(
        authentications => {
          localStorage.setItem('login', authentications.tokenCodeValue);
          this.openSnackBar(resData.Message, 'Login');
          this.router.navigate(['/user/view']);
        }
      );
    });
  }

}
