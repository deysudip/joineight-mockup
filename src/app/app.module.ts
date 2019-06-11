import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {UserService} from '../services/user.services';

import {MaterialModule} from './material.module';
import {CDKModule} from './cdk.module';
import {SpinnerService} from '../services/spinner.service';
import {ToastService} from '../services/toast.service';
import {MatSpinner} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    CDKModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    SpinnerService,
    ToastService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ MatSpinner ],
})
export class AppModule { }
