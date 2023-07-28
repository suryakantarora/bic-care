import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletQrPageRoutingModule } from './wallet-qr-routing.module';

import { WalletQrPage } from './wallet-qr.page';
import { TranslateModule } from '@ngx-translate/core';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletQrPageRoutingModule,
    TranslateModule,
    QRCodeModule
  ],
  declarations: [WalletQrPage]
})
export class WalletQrPageModule {}
