import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FromAccountComponent } from '../pages/account/transfer/from-account/from-account.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [FromAccountComponent],
  exports:[ FromAccountComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
})
export class SharedModule { }
