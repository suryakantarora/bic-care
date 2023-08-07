import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccStatementPageRoutingModule } from './acc-statement-routing.module';

import { AccStatementPage } from './acc-statement.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccStatementPageRoutingModule,
    TranslateModule
  ],
  declarations: [AccStatementPage]
})
export class AccStatementPageModule {}
