import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectLangPageRoutingModule } from './select-lang-routing.module';

import { SelectLangPage } from './select-lang.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectLangPageRoutingModule,
    TranslateModule
  ],
  declarations: [SelectLangPage]
})
export class SelectLangPageModule {}
