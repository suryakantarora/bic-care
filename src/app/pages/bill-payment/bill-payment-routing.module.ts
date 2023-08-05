import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillPaymentPage } from './bill-payment.page';

const routes: Routes = [
  {
    path: '',
    component: BillPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillPaymentPageRoutingModule {}
