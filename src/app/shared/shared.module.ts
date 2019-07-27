import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormViewComponent} from './form-view/form-view.component';
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [FormViewComponent],
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule
  ],
  exports: [
    FormViewComponent
  ]
})
export class SharedModule { }
