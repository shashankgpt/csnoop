import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromShared from '../../shared/state';
import * as fromAuth from '../state';
import * as AuthActions from '../state/auth.action';
import * as SharedActions from '../../shared/state/shared.action';
import { ILogin } from '../dataTypes';
import { takeWhile } from 'rxjs/operators';
import { SpinnerService } from '../../shared/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  value = 'Login';
  loading = false;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  hide = true;
  componentActive = true;
  constructor(private store: Store<fromAuth.State>,
              private shareStore: Store<fromShared.State>,
              private spinService: SpinnerService,
              private cd: ChangeDetectorRef,) { }

  ngOnInit() {
    this.shareStore.pipe(select(fromShared.BtnSpinner),
      takeWhile(() => this.componentActive)).subscribe((activate) => {
        this.loading = activate;
        this.cd.detectChanges();
      });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    const credential: ILogin = {
      username: this.f.username.value,
      password: this.f.password.value
    };
    this.store.dispatch(new AuthActions.LoginUser(credential));
    this.spinService.activeBtnSpinner();
    this.store.pipe(select(fromAuth.getToken),
      takeWhile(() => this.componentActive)).subscribe((response) => {
        if (response.toString() !== '0') {
          localStorage.setItem('login', response.toString());
          this.shareStore.dispatch(new SharedActions.IsLoggedIn(credential.username));
          return true;
        }
      });
  }

  ngOnDestroy() {
    this.componentActive = false;
    this.spinService.deactiveBtnSpinner();
  }
}
