import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmTransferPageRoutingModule } from './confirm-transfer-routing.module';

import { ConfirmTransferPage } from './confirm-transfer.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmTransferPageRoutingModule,
    TranslateModule
  ],
  declarations: [ConfirmTransferPage]
})
export class ConfirmTransferPageModule {}
