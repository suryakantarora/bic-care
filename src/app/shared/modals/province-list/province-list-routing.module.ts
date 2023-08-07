import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvinceListPage } from './province-list.page';

const routes: Routes = [
  {
    path: '',
    component: ProvinceListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProvinceListPageRoutingModule {}
