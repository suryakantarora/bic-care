import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FtBicLapnetPage } from './ft-bic-lapnet.page';

const routes: Routes = [
  {
    path: '',
    component: FtBicLapnetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FtBicLapnetPageRoutingModule {}
