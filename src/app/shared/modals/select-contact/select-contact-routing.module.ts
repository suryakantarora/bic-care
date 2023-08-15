import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectContactPage } from './select-contact.page';

const routes: Routes = [
  {
    path: '',
    component: SelectContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectContactPageRoutingModule {}
