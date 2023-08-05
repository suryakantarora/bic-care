import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletToWalletPageRoutingModule } from './wallet-to-wallet-routing.module';

import { WalletToWalletPage } from './wallet-to-wallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletToWalletPageRoutingModule
  ],
  declarations: [WalletToWalletPage]
})
export class WalletToWalletPageModule {}
