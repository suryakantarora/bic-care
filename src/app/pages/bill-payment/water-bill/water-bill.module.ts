import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaterBillPageRoutingModule } from './water-bill-routing.module';

import { WaterBillPage } from './water-bill.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaterBillPageRoutingModule,
    TranslateModule
  ],
  declarations: [WaterBillPage]
})
export class WaterBillPageModule {}
