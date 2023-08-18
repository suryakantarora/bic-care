import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferPageRoutingModule } from './transfer-routing.module';

import { TransferPage } from './transfer.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedCurrencyModule } from 'src/app/shared/module/shared-currency.module';
import { WalletDetailModule } from '../wallet-detail/wallet-detail.module';
import { WalletToWalletPageModule } from './wallet-to-wallet/wallet-to-wallet.module';
import { WalletToAccountPageModule } from './wallet-to-account/wallet-to-account.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountToWalletPageModule } from './account-to-wallet/account-to-wallet.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    TransferPageRoutingModule,
    TranslateModule,
    SharedCurrencyModule,
    WalletDetailModule,
    WalletToWalletPageModule,
    WalletToAccountPageModule,
    AccountToWalletPageModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [TransferPage]
})
export class TransferPageModule {}
