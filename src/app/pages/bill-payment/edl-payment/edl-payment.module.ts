import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdlPaymentPageRoutingModule } from './edl-payment-routing.module';

import { EdlPaymentPage } from './edl-payment.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedCurrencyModule } from 'src/app/shared/module/shared-currency.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    EdlPaymentPageRoutingModule,
    TranslateModule, SharedCurrencyModule
  ],
  declarations: [EdlPaymentPage]
})
export class EdlPaymentPageModule {}
