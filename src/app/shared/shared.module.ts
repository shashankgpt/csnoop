import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormViewComponent} from './form-view/form-view.component';
import { CoreModule } from '../core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptorService } from './services/app-interceptor.service';


@NgModule({
  declarations: [FormViewComponent],
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule
  ],
  exports: [
    FormViewComponent
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
