import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletDetailComponent } from './wallet-detail.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [WalletDetailComponent,],
  exports: [WalletDetailComponent,],
  imports: [
    CommonModule, IonicModule, TranslateModule
  ]
})
export class WalletDetailModule { }
