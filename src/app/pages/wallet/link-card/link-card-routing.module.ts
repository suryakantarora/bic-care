import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinkCardPage } from './link-card.page';

const routes: Routes = [
  {
    path: '',
    component: LinkCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkCardPageRoutingModule {}
