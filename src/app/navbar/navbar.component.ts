import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromShared from '../shared/state/shared.reducer';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver, private store: Store<fromShared.State>) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  ngOnInit(): void {
    this.store.pipe(select('shared')).subscribe((data: fromShared.State) => {
      alert(data.loggedIn);
      console.log("main data");
      console.log(data);
      console.log("main data end");
    });
  }

}
