import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountQrPage } from './account-qr.page';

const routes: Routes = [
  {
    path: '',
    component: AccountQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountQrPageRoutingModule {}
