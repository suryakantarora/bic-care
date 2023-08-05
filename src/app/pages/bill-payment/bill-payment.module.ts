import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillPaymentPageRoutingModule } from './bill-payment-routing.module';

import { BillPaymentPage } from './bill-payment.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillPaymentPageRoutingModule,
    TranslateModule
  ],
  declarations: [BillPaymentPage]
})
export class BillPaymentPageModule {}
