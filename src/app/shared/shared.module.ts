import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormViewComponent} from './form-view/form-view.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [FormViewComponent],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    FormViewComponent
  ]
})
export class SharedModule { }
