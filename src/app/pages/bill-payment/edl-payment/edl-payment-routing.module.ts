import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdlPaymentPage } from './edl-payment.page';

const routes: Routes = [
  {
    path: '',
    component: EdlPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdlPaymentPageRoutingModule {}
