import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FtBicUmoneyPage } from './ft-bic-umoney.page';

const routes: Routes = [
  {
    path: '',
    component: FtBicUmoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FtBicUmoneyPageRoutingModule {}
