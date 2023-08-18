import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountToWalletPageRoutingModule } from './account-to-wallet-routing.module';

import { AccountToWalletPage } from './account-to-wallet.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedCurrencyModule } from 'src/app/shared/module/shared-currency.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AccountToWalletPageRoutingModule,
    TranslateModule,
    SharedModule, SharedCurrencyModule
  ],
  declarations: [AccountToWalletPage],
  exports: [AccountToWalletPage]
})
export class AccountToWalletPageModule {}
