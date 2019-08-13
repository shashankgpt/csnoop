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
  changeDetection: ChangeDetectionStrategy.OnPush
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
  subscribeUserMessage() {
    this.store.pipe(select(fromAuth.getAuthMessage),
      takeWhile(() => this.componentActive)).subscribe((response) => {
        // if (response) {
        // this.shareStore.dispatch({
        //   type: 'SPINNER_ACTIVATE',
        //   payload: false
        // });
        if (response) {
          const snack1: ISnackbar = {
            snackBarActive: true,
            snackBarMessage: response,
            snackBarAction: 'Login'
          };
          // this.shareStore.dispatch({
          //   type: 'SET_NOTIFY',
          //   payload: snack1
          // });
          this.shareStore.dispatch(new SharedActions.ActivateSpinner(snack1));
          this.router.navigate(['/user/view']);
        }
          // this.store.dispatch(new AuthActions.SetMessage(''));
          // this.cd.detectChanges();
        // this.router.navigate(['/user/view']);
        // }

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
          // this.shareStore.dispatch({
          //   type: 'SET_NOTIFY',
          //   payload: snack1
          // });
          // this.shareStore.dispatch({
          //   type: 'SPINNER_ACTIVATE',
          //   payload: false
          // });
          this.shareStore.dispatch(new SharedActions.ActivateSpinner(snack1));
        }
      });
  }
  onSubmit() {

    const credential: ILogin = {
      username : this.f.username.value,
      password: this.f.password.value
    };
    this.store.dispatch(new AuthActions.LoginUser(credential));
    this.store.pipe(select(fromAuth.getToken),
      takeWhile(() => this.componentActive)).subscribe((response) => {
        localStorage.setItem('login', response.toString());
        this.shareStore.dispatch(new SharedActions.IsLoggedIn());
        this.shareStore.dispatch(new SharedActions.SetCurrentUsername(credential.username))
      });
    this.subscribeUserMessage();
    // this.authService.login(this.f.username.value, this.f.password.value).subscribe(resData => {
    //   this.shareStore.dispatch({
    //     type: 'LOGGED_IN',
    //     payload: true
    //   });
    //   this.shareStore.dispatch({
    //     type: 'SET_USERNAME',
    //     payload: this.f.username.value
    //   });
    //   this.store.pipe(select('authentications')).subscribe(
    //     authentications => {
    //       localStorage.setItem('login', authentications.tokenCodeValue);
    //       // this.openSnackBar(resData.Message, 'Login');
    //       const snack1: ISnackbar = {
    //         snackBarActive: true,
    //         snackBarMessage: resData.Message,
    //         snackBarAction: 'Login'
    //       };
    //       this.shareStore.dispatch({
    //         type: 'SET_NOTIFY',
    //         payload: snack1
    //       });
    //       this.shareStore.dispatch({
    //         type: 'SPINNER_ACTIVATE',
    //         payload: false
    //       });
    //       this.router.navigate(['/user/view']);
    //     }
    //   );
    // });
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
}
