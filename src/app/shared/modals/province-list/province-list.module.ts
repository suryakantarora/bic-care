import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProvinceListPageRoutingModule } from './province-list-routing.module';

import { ProvinceListPage } from './province-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProvinceListPageRoutingModule,
    TranslateModule
  ],
  declarations: [ProvinceListPage]
})
export class ProvinceListPageModule {}
