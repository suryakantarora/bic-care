import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TxnFeePage } from './txn-fee.page';

const routes: Routes = [
  {
    path: '',
    component: TxnFeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TxnFeePageRoutingModule {}
