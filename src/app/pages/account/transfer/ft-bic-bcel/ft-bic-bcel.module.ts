import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FtBicBcelPageRoutingModule } from './ft-bic-bcel-routing.module';

import { FtBicBcelPage } from './ft-bic-bcel.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FtBicBcelPageRoutingModule,
    TranslateModule
  ],
  declarations: [FtBicBcelPage]
})
export class FtBicBcelPageModule {}
