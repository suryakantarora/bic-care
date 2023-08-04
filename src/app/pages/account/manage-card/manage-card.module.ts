import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageCardPageRoutingModule } from './manage-card-routing.module';

import { ManageCardPage } from './manage-card.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageCardPageRoutingModule,
    TranslateModule
  ],
  declarations: [ManageCardPage]
})
export class ManageCardPageModule {}
