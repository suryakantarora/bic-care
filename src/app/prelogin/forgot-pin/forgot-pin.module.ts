import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPinPageRoutingModule } from './forgot-pin-routing.module';

import { ForgotPinPage } from './forgot-pin.page';
import { TranslateModule } from '@ngx-translate/core';
import {
  RoundProgressModule,
  ROUND_PROGRESS_DEFAULTS
  } from 'angular-svg-round-progressbar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPinPageRoutingModule,
    TranslateModule,
    RoundProgressModule,
    ReactiveFormsModule
  ],
  declarations: [ForgotPinPage]
})
export class ForgotPinPageModule {}
