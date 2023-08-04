import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccDetailsPageRoutingModule } from './acc-details-routing.module';

import { AccDetailsPage } from './acc-details.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccDetailsPageRoutingModule,
    TranslateModule
  ],
  declarations: [AccDetailsPage]
})
export class AccDetailsPageModule {}
