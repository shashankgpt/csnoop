import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import * as fromShared from '../shared/state';
import { Store, select } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent } from '@angular/router';
import * as SharedActions from '../shared/state/shared.action';
import { AuthCheckService } from '../auth/services/auth-check.service';
import * as fromUser from '../user/state';

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
    private authCheckService: AuthCheckService,
    private cd: ChangeDetectorRef
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
    this.sharedStore.dispatch(new SharedActions.DeactivateBtnSpinner());
    if (url) {
      this.router.navigate([url]);
    }
  }
  ngOnInit() {
    if (this.authCheckService.isLoggedIn() && !this.logged) {
      this.sharedStore.dispatch(new SharedActions.LoadUserName());
      this.sharedStore.pipe(select(fromShared.getLoggedUserName),
        takeWhile(() => this.componentActive)).subscribe((username) => {
          this.username = username;
          this.logged = username ? true : false;
          this.cd.detectChanges();
        });
    }

    this.sharedStore.pipe(select(fromShared.Spinner),
      takeWhile(() => this.componentActive)).subscribe((activate) => {
        this.globalSpinner = activate;
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
        this.logged = message ? true : this.logged;
        this.cd.detectChanges();
      });
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
}
