import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinkCardPageRoutingModule } from './link-card-routing.module';

import { LinkCardPage } from './link-card.page';
import { TranslateModule } from '@ngx-translate/core';
import { MaskitoModule } from '@maskito/angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinkCardPageRoutingModule,
    TranslateModule, MaskitoModule
  ],
  declarations: [LinkCardPage]
})
export class LinkCardPageModule {}
