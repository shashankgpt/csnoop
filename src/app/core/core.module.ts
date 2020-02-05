import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatStepperModule} from '@angular/material/stepper';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatStepperModule,
    FroalaEditorModule,
    FroalaViewModule
  ]
})
export class CoreModule { }
