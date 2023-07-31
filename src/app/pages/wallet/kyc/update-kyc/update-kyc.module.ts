import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateKycPageRoutingModule } from './update-kyc-routing.module';

import { UpdateKycPage } from './update-kyc.page';
import { TranslateModule } from '@ngx-translate/core';
import { CaptureIdPage } from '../capture-id/capture-id.page';
import { CaptureSelfiePage } from '../capture-selfie/capture-selfie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateKycPageRoutingModule,
    TranslateModule
  ],
  declarations: [UpdateKycPage, CaptureIdPage, CaptureSelfiePage],
})
export class UpdateKycPageModule {}
