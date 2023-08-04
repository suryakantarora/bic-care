import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FtBicUmoneyPageRoutingModule } from './ft-bic-umoney-routing.module';

import { FtBicUmoneyPage } from './ft-bic-umoney.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FtBicUmoneyPageRoutingModule,
    TranslateModule
  ],
  declarations: [FtBicUmoneyPage]
})
export class FtBicUmoneyPageModule {}
