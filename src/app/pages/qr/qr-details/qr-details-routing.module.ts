import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrDetailsPage } from './qr-details.page';

const routes: Routes = [
  {
    path: '',
    component: QrDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrDetailsPageRoutingModule {}
