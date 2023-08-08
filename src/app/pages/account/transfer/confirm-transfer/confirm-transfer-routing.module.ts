import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmTransferPage } from './confirm-transfer.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmTransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmTransferPageRoutingModule {}
