import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FtBicBicPageRoutingModule } from './ft-bic-bic-routing.module';

import { FtBicBicPage } from './ft-bic-bic.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedCurrencyModule } from 'src/app/shared/module/shared-currency.module';
import { OwnAccTransferComponent } from './own-acc-transfer/own-acc-transfer.component';
import { BicAccTransferComponent } from './bic-acc-transfer/bic-acc-transfer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FtBicBicPageRoutingModule,
    TranslateModule,
    SharedCurrencyModule
  ],
  declarations: [FtBicBicPage, OwnAccTransferComponent, BicAccTransferComponent]
})
export class FtBicBicPageModule {}
