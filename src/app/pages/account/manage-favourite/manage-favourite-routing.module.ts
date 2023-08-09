import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageFavouritePage } from './manage-favourite.page';

const routes: Routes = [
  {
    path: '',
    component: ManageFavouritePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageFavouritePageRoutingModule {}
