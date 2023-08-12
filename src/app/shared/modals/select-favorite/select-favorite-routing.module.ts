import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectFavoritePage } from './select-favorite.page';

const routes: Routes = [
  {
    path: '',
    component: SelectFavoritePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectFavoritePageRoutingModule {}
