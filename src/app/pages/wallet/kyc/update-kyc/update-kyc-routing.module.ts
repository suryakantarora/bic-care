import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateKycPage } from './update-kyc.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateKycPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateKycPageRoutingModule {}
