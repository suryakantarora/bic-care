import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrOptionPageRoutingModule } from './qr-option-routing.module';

import { QrOptionPage } from './qr-option.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrOptionPageRoutingModule,
    TranslateModule
  ],
  declarations: [QrOptionPage]
})
export class QrOptionPageModule {}
