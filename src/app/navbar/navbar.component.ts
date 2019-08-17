import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, from } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import * as fromShared from '../shared/state';
import { Store, select } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent } from '@angular/router';
import { ISnackbar } from '../dataTypes/snackbar';
import * as SharedActions from '../shared/state/shared.action';
import * as AuthActions from '../auth/state/auth.action';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {
  showSpinner = false;
  globalSpinner = false;
  logged = false;
  username = '';
  componentActive = true;
  constructor(private breakpointObserver: BreakpointObserver,
              private snackBar: MatSnackBar,
              private sharedStore: Store<fromShared.State>,
              private router: Router,
  ) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showSpinner = true;
      }
      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
          this.showSpinner = false;
      }
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  openSnackBar(msg, action, url) {
    this.snackBar.open(msg, action, {
      duration: 2000,
    });
    this.sharedStore.dispatch(new SharedActions.DeactivateSnackBar());
    if (url) {
    this.router.navigate([url]);
    }
  }
  ngOnInit() {
    this.sharedStore.pipe(select(fromShared.Spinner),
      takeWhile(() => this.componentActive)).subscribe((message) => {
        this.globalSpinner = message;
      });
    this.sharedStore.pipe(select(fromShared.getSnackbarMessage),
      takeWhile(() => this.componentActive)).subscribe((message) => {
        if (message.snackBarActive) {
          this.openSnackBar(message.snackBarMessage, message.snackBarAction, message.redirectUrl);
        }
      });
    this.sharedStore.pipe(select(fromShared.getLoggedUserName),
      takeWhile(() => this.componentActive)).subscribe((message) => {
          this.username = message;
          this.logged = message ? true : false;
      });
  }

  // logout() {
  //   localStorage.clear();
  //   const snack1: ISnackbar = {
  //     snackBarActive: true,
  //     snackBarMessage: 'Logout Successfully',
  //     snackBarAction: 'Logout',
  //     redirectUrl: '/auth/login',
  //   };
  //   this.sharedStore.dispatch(new SharedActions.IsLoggedOut());
  //   this.sharedStore.dispatch(new SharedActions.ActivateSnackBar(snack1));
  //   this.sharedStore.dispatch(new AuthActions.LogoutUser());
  // }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
