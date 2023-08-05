import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoadTaxPageRoutingModule } from './road-tax-routing.module';

import { RoadTaxPage } from './road-tax.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoadTaxPageRoutingModule,
    TranslateModule
  ],
  declarations: [RoadTaxPage]
})
export class RoadTaxPageModule {}
