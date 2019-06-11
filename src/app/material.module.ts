import { NgModule } from '@angular/core';

import {
  MatListModule, MatIconModule, MatProgressSpinnerModule, MatButtonModule,
  MatPaginatorModule, MatSnackBarModule, MatFormFieldModule, MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule {}
