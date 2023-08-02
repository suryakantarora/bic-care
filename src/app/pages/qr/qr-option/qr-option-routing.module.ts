import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrOptionPage } from './qr-option.page';

const routes: Routes = [
  {
    path: '',
    component: QrOptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrOptionPageRoutingModule {}
