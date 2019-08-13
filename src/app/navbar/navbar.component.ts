import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, from } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import * as fromShared from '../shared/state';
import { Store, select } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent } from '@angular/router';
import { ISnackbar } from '../user/dataTypes';
import * as SharedActions from '../shared/state/shared.action';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
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
              private router: Router
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
  openSnackBar(msg, action) {
    this.snackBar.open(msg, action, {
      duration: 2000,
    });
    // this.sharedStore.dispatch(new SharedActions.DeactivateSpinner());
    // const snack1: ISnackbar = {
    //   snackBarActive: false,
    //   snackBarMessage: '',
    //   snackBarAction: ''
    // };
    // this.sharedStore.dispatch({
    //   type: 'SET_NOTIFY',
    //   payload: snack1
    // });
  }
  ngOnInit() {
    this.sharedStore.pipe(select(fromShared.getSnackbarMessage),
      takeWhile(() => this.componentActive)).subscribe((message) => {
        if (message.snackBarActive) {
          this.sharedStore.dispatch(new SharedActions.DeactivateSpinner());
          this.openSnackBar(message.snackBarMessage, message.snackBarAction);
        }
      });
    this.sharedStore.pipe(select(fromShared.getLoggedUserName),
      takeWhile(() => this.componentActive)).subscribe((message) => {
          this.username = message;
      });
    this.sharedStore.pipe(select(fromShared.LoggedIn),
      takeWhile(() => this.componentActive)).subscribe((message) => {
          this.logged = message;
      });
    // this.sharedStore.pipe(select('shared')).subscribe((data: fromShared.State) => {
    //   this.globalSpinner = data.spinnerActive;
    //   this.logged = data.loggedIn;
    //   this.username = data.username;
    //   if (data.snackBar.snackBarActive) {
    //       this.openSnackBar(data.snackBar.snackBarMessage, data.snackBar.snackBarAction);
    //   }
    // });
  }
  logout() {
    localStorage.clear();
    const snack1: ISnackbar = {
      snackBarActive: true,
      snackBarMessage: 'Logout Successfully',
      snackBarAction: 'Logout'
    };
    // this.sharedStore.dispatch({
    //   type: 'SET_NOTIFY',
    //   payload: snack1
    // });
    // this.sharedStore.dispatch({
    //   type: 'LOGGED_IN',
    //   payload: false
    // });
    // this.sharedStore.dispatch({
    //   type: 'SET_USERNAME',
    //   payload: ''
    // });
    // this.sharedStore.dispatch(new SharedActions.SetCurrentUsername(''));
    this.sharedStore.dispatch(new SharedActions.IsLoggedOut());
    this.sharedStore.dispatch(new SharedActions.ActivateSpinner(snack1));
    this.router.navigate(['/auth/login']);
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
  }
