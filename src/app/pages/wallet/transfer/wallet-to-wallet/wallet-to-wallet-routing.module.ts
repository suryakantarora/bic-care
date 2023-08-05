import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletToWalletPage } from './wallet-to-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: WalletToWalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletToWalletPageRoutingModule {}
