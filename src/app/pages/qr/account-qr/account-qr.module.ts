import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountQrPageRoutingModule } from './account-qr-routing.module';

import { AccountQrPage } from './account-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountQrPageRoutingModule
  ],
  declarations: [AccountQrPage]
})
export class AccountQrPageModule {}
