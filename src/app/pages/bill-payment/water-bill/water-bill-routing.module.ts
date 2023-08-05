import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaterBillPage } from './water-bill.page';

const routes: Routes = [
  {
    path: '',
    component: WaterBillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaterBillPageRoutingModule {}
