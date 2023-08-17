import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletToAccountPageRoutingModule } from './wallet-to-account-routing.module';

import { WalletToAccountPage } from './wallet-to-account.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    WalletToAccountPageRoutingModule,
    TranslateModule
  ],
  declarations: [WalletToAccountPage],
  exports: [WalletToAccountPage],
})
export class WalletToAccountPageModule {}
