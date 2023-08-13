import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletToWalletPageRoutingModule } from './wallet-to-wallet-routing.module';

import { WalletToWalletPage } from './wallet-to-wallet.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedCurrencyModule } from 'src/app/shared/module/shared-currency.module';
import { WalletDetailModule } from '../../wallet-detail/wallet-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule, TranslateModule,
    WalletToWalletPageRoutingModule,
    SharedCurrencyModule, WalletDetailModule
  ],
  declarations: [WalletToWalletPage]
})
export class WalletToWalletPageModule {}
