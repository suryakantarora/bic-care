import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletToAccountPage } from './wallet-to-account.page';

const routes: Routes = [
  {
    path: '',
    component: WalletToAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletToAccountPageRoutingModule {}
