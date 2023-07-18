import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletDashboardPageRoutingModule } from './wallet-dashboard-routing.module';

import { WalletDashboardPage } from './wallet-dashboard.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletDashboardPageRoutingModule,
    TranslateModule
  ],
  declarations: [WalletDashboardPage]
})
export class WalletDashboardPageModule {}
