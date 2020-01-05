import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormViewComponent} from './form-view/form-view.component';
import { CoreModule } from '../core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptorService } from './services/app-interceptor.service';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/shared.reducer';
import { CompareFieldValidatorDirective } from './services/compare-field-validator.directive';
import { EffectsModule } from '@ngrx/effects';
import {SharedEffects } from './state/shared.effects';

@NgModule({
  declarations: [FormViewComponent, CompareFieldValidatorDirective],
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule,
    StoreModule.forFeature('shared', reducer),
    EffectsModule.forFeature([SharedEffects])
  ],
  exports: [
    FormViewComponent,
    CompareFieldValidatorDirective
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true
    }
  ]
})
export class SharedModule { }

