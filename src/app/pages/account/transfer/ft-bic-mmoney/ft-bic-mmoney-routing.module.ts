import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FtBicMmoneyPage } from './ft-bic-mmoney.page';

const routes: Routes = [
  {
    path: '',
    component: FtBicMmoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FtBicMmoneyPageRoutingModule {}
