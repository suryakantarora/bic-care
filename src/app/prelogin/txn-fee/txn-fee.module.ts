import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TxnFeePageRoutingModule } from './txn-fee-routing.module';

import { TxnFeePage } from './txn-fee.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TxnFeePageRoutingModule,
    TranslateModule
  ],
  declarations: [TxnFeePage]
})
export class TxnFeePageModule {}
