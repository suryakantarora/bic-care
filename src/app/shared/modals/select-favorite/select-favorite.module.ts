import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectFavoritePageRoutingModule } from './select-favorite-routing.module';

import { SelectFavoritePage } from './select-favorite.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectFavoritePageRoutingModule,
    TranslateModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [SelectFavoritePage]
})
export class SelectFavoritePageModule {}
