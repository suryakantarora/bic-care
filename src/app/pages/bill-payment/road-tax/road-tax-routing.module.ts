import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoadTaxPage } from './road-tax.page';

const routes: Routes = [
  {
    path: '',
    component: RoadTaxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoadTaxPageRoutingModule {}
