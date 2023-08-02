import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletQrPageRoutingModule } from './wallet-qr-routing.module';

import { WalletQrPage } from './wallet-qr.page';
import { TranslateModule } from '@ngx-translate/core';
import { QRCodeModule } from 'angularx-qrcode';
import { SharedCurrencyModule } from 'src/app/shared/module/shared-currency.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    WalletQrPageRoutingModule,
    TranslateModule,
    QRCodeModule, SharedCurrencyModule
  ],
  declarations: [WalletQrPage],
})
export class WalletQrPageModule {}
