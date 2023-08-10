import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BicOtherPageRoutingModule } from './bic-other-routing.module';

import { BicOtherPage } from './bic-other.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedCurrencyModule } from 'src/app/shared/module/shared-currency.module';
import { BicBcelComponent } from './bic-bcel/bic-bcel.component';
import { BicLapnetComponent } from './bic-lapnet/bic-lapnet.component';
import { BicUmoneyComponent } from './bic-umoney/bic-umoney.component';
import { BicMmoneyComponent } from './bic-mmoney/bic-mmoney.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BicOtherPageRoutingModule,
    TranslateModule,
    SharedCurrencyModule
  ],
  declarations: [BicOtherPage, BicBcelComponent, BicLapnetComponent, BicUmoneyComponent, BicMmoneyComponent]
})
export class BicOtherPageModule {}
