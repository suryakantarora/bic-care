import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletToAccountPageRoutingModule } from './wallet-to-account-routing.module';

import { WalletToAccountPage } from './wallet-to-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletToAccountPageRoutingModule
  ],
  declarations: [WalletToAccountPage]
})
export class WalletToAccountPageModule {}
