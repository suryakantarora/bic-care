import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FtBicBcelPage } from './ft-bic-bcel.page';

const routes: Routes = [
  {
    path: '',
    component: FtBicBcelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FtBicBcelPageRoutingModule {}
