import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ]
})
export class CoreModule { }
