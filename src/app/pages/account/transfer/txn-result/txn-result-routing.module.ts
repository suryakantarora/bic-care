import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TxnResultPage } from './txn-result.page';

const routes: Routes = [
  {
    path: '',
    component: TxnResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TxnResultPageRoutingModule {}
