import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromShared from '../shared/state/shared.reducer';
import { Store, select } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  spinner = false;
  constructor(private breakpointObserver: BreakpointObserver, private snackBar: MatSnackBar, private store: Store<fromShared.State>) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    openSnackBar(msg, action) {
      this.snackBar.open(msg, action, {
        duration: 2000,
      });
    }
  ngOnInit(): void {
    this.store.pipe(select('shared')).subscribe((data: fromShared.State) => {
      if(data.snackBar.snackBarActive) {
      this.spinner = data.spinnerActive;
      this.openSnackBar(data.snackBar.snackBarMessage, data.snackBar.snackBarAction);
      }
    });
  }

}
