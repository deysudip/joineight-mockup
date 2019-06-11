import { NgModule } from '@angular/core';
import {LayoutModule} from '@angular/cdk/layout';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {OverlayModule} from "@angular/cdk/overlay";
import {PortalModule} from '@angular/cdk/portal';

@NgModule({
  imports: [
    LayoutModule,
    OverlayModule,
    PortalModule,
    DragDropModule
  ],
  exports: [
    LayoutModule,
    OverlayModule,
    PortalModule,
    DragDropModule
  ]
})
export class CDKModule {}
