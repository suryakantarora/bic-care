import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdlPaymentPageRoutingModule } from './edl-payment-routing.module';

import { EdlPaymentPage } from './edl-payment.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdlPaymentPageRoutingModule,
    TranslateModule
  ],
  declarations: [EdlPaymentPage]
})
export class EdlPaymentPageModule {}
