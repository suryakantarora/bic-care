import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KycStatusPageRoutingModule } from './kyc-status-routing.module';

import { KycStatusPage } from './kyc-status.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KycStatusPageRoutingModule,
    TranslateModule
  ],
  declarations: [KycStatusPage]
})
export class KycStatusPageModule {}
