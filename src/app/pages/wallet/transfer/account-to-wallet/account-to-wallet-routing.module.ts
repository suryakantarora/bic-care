import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountToWalletPage } from './account-to-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: AccountToWalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountToWalletPageRoutingModule {}
