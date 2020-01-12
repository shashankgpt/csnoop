import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatInputModule, MatCardModule, MatMenuModule, MatRadioModule, MatTableModule, MatSlideToggleModule,
  MatFormFieldModule, MatToolbarModule, MatSnackBarModule, MatProgressSpinnerModule,
   MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCheckbox, MatCheckboxModule,
   MatGridListModule, MatSelectModule } from '@angular/material';
import { UiCarouselModule } from 'ngx-ui-carousel';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    UiCarouselModule,
    LayoutModule,
    MatRadioModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTableModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
