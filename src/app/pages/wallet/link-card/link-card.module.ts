import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinkCardPageRoutingModule } from './link-card-routing.module';

import { LinkCardPage } from './link-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinkCardPageRoutingModule
  ],
  declarations: [LinkCardPage]
})
export class LinkCardPageModule {}
