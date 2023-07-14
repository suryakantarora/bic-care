import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PinLoginPageRoutingModule } from './pin-login-routing.module';

import { PinLoginPage } from './pin-login.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PinLoginPageRoutingModule,
    TranslateModule
  ],
  declarations: [PinLoginPage]
})
export class PinLoginPageModule {}
