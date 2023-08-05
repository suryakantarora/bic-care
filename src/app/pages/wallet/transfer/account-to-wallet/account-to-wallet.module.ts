import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountToWalletPageRoutingModule } from './account-to-wallet-routing.module';

import { AccountToWalletPage } from './account-to-wallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountToWalletPageRoutingModule
  ],
  declarations: [AccountToWalletPage]
})
export class AccountToWalletPageModule {}
