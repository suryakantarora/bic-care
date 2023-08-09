import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageFavouritePageRoutingModule } from './manage-favourite-routing.module';

import { ManageFavouritePage } from './manage-favourite.page';
import { TranslateModule } from '@ngx-translate/core';
import { AddFavoriteComponent } from './add-favorite/add-favorite.component';
import { ListFavoriteComponent } from './list-favorite/list-favorite.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    ManageFavouritePageRoutingModule,
    TranslateModule
  ],
  declarations: [ManageFavouritePage, AddFavoriteComponent, ListFavoriteComponent]
})
export class ManageFavouritePageModule {}
