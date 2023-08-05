import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrDetailsPageRoutingModule } from './qr-details-routing.module';

import { QrDetailsPage } from './qr-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrDetailsPageRoutingModule
  ],
  declarations: [QrDetailsPage]
})
export class QrDetailsPageModule {}
