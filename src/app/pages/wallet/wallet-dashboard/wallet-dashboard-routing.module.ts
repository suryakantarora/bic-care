import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletDashboardPage } from './wallet-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: WalletDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletDashboardPageRoutingModule {}
