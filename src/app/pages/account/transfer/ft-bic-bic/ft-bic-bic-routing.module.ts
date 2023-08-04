import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FtBicBicPage } from './ft-bic-bic.page';

const routes: Routes = [
  {
    path: '',
    component: FtBicBicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FtBicBicPageRoutingModule {}
