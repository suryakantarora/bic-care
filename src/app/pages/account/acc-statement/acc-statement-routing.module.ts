import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccStatementPage } from './acc-statement.page';

const routes: Routes = [
  {
    path: '',
    component: AccStatementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccStatementPageRoutingModule {}
