import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FtBicLapnetPageRoutingModule } from './ft-bic-lapnet-routing.module';

import { FtBicLapnetPage } from './ft-bic-lapnet.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FtBicLapnetPageRoutingModule,
    TranslateModule
  ],
  declarations: [FtBicLapnetPage]
})
export class FtBicLapnetPageModule {}
