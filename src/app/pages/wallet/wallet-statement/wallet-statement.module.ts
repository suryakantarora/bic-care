import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletStatementPageRoutingModule } from './wallet-statement-routing.module';

import { WalletStatementPage } from './wallet-statement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletStatementPageRoutingModule
  ],
  declarations: [WalletStatementPage]
})
export class WalletStatementPageModule {}
