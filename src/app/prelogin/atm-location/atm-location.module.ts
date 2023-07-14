import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtmLocationPageRoutingModule } from './atm-location-routing.module';

import { AtmLocationPage } from './atm-location.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtmLocationPageRoutingModule,
    TranslateModule
  ],
  declarations: [AtmLocationPage]
})
export class AtmLocationPageModule {}
