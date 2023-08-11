import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankListPageRoutingModule } from './bank-list-routing.module';

import { BankListPage } from './bank-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankListPageRoutingModule,
    TranslateModule
  ],
  declarations: [BankListPage]
})
export class BankListPageModule {}
