import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BicOtherPage } from './bic-other.page';

const routes: Routes = [
  {
    path: '',
    component: BicOtherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BicOtherPageRoutingModule {}
