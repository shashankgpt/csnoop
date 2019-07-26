import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormViewComponent} from './form-view/form-view.component';


@NgModule({
  declarations: [FormViewComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FormViewComponent
  ]
})
export class SharedModule { }
