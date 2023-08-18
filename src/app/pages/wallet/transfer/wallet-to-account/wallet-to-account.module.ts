import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletToAccountPageRoutingModule } from './wallet-to-account-routing.module';

import { WalletToAccountPage } from './wallet-to-account.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedCurrencyModule } from 'src/app/shared/module/shared-currency.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    WalletToAccountPageRoutingModule,
    TranslateModule,
    SharedModule, SharedCurrencyModule
  ],
  declarations: [WalletToAccountPage],
  exports: [WalletToAccountPage],
})
export class WalletToAccountPageModule {}
