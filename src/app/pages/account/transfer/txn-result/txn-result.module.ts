import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TxnResultPageRoutingModule } from './txn-result-routing.module';

import { TxnResultPage } from './txn-result.page';
import { TranslateModule } from '@ngx-translate/core';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TxnResultPageRoutingModule,
    TranslateModule, QRCodeModule
  ],
  declarations: [TxnResultPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TxnResultPageModule {}
