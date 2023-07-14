import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FtOptionsPageRoutingModule } from './ft-options-routing.module';

import { FtOptionsPage } from './ft-options.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FtOptionsPageRoutingModule,
    TranslateModule
  ],
  declarations: [FtOptionsPage]
})
export class FtOptionsPageModule {}
