import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InternetPageRoutingModule } from './internet-routing.module';

import { InternetPage } from './internet.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InternetPageRoutingModule,
    TranslateModule
  ],
  declarations: [InternetPage]
})
export class InternetPageModule {}
