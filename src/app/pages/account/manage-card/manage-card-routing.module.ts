import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageCardPage } from './manage-card.page';

const routes: Routes = [
  {
    path: '',
    component: ManageCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageCardPageRoutingModule {}
