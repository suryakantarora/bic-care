import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletStatementPage } from './wallet-statement.page';

const routes: Routes = [
  {
    path: '',
    component: WalletStatementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletStatementPageRoutingModule {}
