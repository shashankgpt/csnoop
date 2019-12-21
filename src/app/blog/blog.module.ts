import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogsComponent } from './blogs.component';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule, Store, select } from '@ngrx/store';
import { reducer } from './state/blog.reducer';
import { EffectsModule } from '@ngrx/effects';
import {BlogEffects } from './state/blog.effects';
import * as fromShared from '../shared/state';
import * as fromBlog from './state';
import { takeWhile } from 'rxjs/operators';
import * as SharedActions from '../shared/state/shared.action';
import * as BlogActions from './state/blog.action';
@NgModule({
  declarations: [BlogsComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    CoreModule,
    SharedModule,
    StoreModule.forFeature('blogs', reducer),
    EffectsModule.forFeature([BlogEffects])
  ]

})
export class BlogModule {
  componentActive = true;
  constructor(private store: Store<fromBlog.State>, private shareStore: Store<fromShared.State>) {
  this.subscribeNotification();
  }

  subscribeNotification() {
    this.store.pipe(select(fromBlog.getBlogsMessage),
    takeWhile(() => this.componentActive)).subscribe((snackResponse) => {
      if (snackResponse.snackBarActive) {
        this.shareStore.dispatch(new SharedActions.ActivateSnackBar(snackResponse));
        this.store.dispatch(new BlogActions.LoadAllBlog());
      }
    });
  }
}


