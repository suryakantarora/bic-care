import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountQrPageRoutingModule } from './account-qr-routing.module';

import { AccountQrPage } from './account-qr.page';
import { TranslateModule } from '@ngx-translate/core';
import { QRCodeModule } from 'angularx-qrcode';
import { SharedCurrencyModule } from 'src/app/shared/module/shared-currency.module';
// import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule } from "ng2-currency-mask";

/* export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: "."
};
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountQrPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule, QRCodeModule, SharedCurrencyModule
  ],
  declarations: [AccountQrPage],
})
export class AccountQrPageModule { }
