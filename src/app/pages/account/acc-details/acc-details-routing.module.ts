import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccDetailsPage } from './acc-details.page';

const routes: Routes = [
  {
    path: '',
    component: AccDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccDetailsPageRoutingModule {}
