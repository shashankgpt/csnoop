import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromShared from '../../shared/state';
import * as fromAuth from '../state';
import * as AuthActions from '../state/auth.action';
import * as SharedActions from '../../shared/state/shared.action';
import { ISnackbar } from 'src/app/user/dataTypes';
import { ILogin } from '../dataTypes';
import { takeWhile } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  value = 'Login';
  durationInSeconds = 5;
  spinner = false;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  hide = true;
  componentActive = true;
  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router,
              private store: Store<fromAuth.State>, private shareStore: Store<fromShared.State>) { }
  ngOnInit() {
  }

  get f() {
    return this.loginForm.controls;
  }

  openSnackBar(msg, action) {
    this.snackBar.open(msg, action, {
      duration: 2000,
    });
  }


  onSubmit() {
    const credential: ILogin = {
      username: this.f.username.value,
      password: this.f.password.value
    };
    this.store.dispatch(new AuthActions.LoginUser(credential));
    this.store.pipe(select(fromAuth.getToken),
      takeWhile(() => this.componentActive)).subscribe((response) => {
        if (response.toString() !== '0') {
          localStorage.setItem('login', response.toString());
          this.shareStore.dispatch(new SharedActions.IsLoggedIn());
          this.shareStore.dispatch(new SharedActions.SetCurrentUsername(credential.username));
          // this.subscribeSuccessUserMessage();
          return true;
        }
        // this.subscribeUnsuccessUserMessage();
      });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
