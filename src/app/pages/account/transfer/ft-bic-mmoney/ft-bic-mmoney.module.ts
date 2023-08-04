import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FtBicMmoneyPageRoutingModule } from './ft-bic-mmoney-routing.module';

import { FtBicMmoneyPage } from './ft-bic-mmoney.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FtBicMmoneyPageRoutingModule,
    TranslateModule
  ],
  declarations: [FtBicMmoneyPage]
})
export class FtBicMmoneyPageModule {}
