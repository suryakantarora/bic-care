import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FtOptionsPage } from './ft-options.page';

const routes: Routes = [
  {
    path: '',
    component: FtOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FtOptionsPageRoutingModule {}
