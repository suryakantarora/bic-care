import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FromAccountComponent } from '../pages/account/transfer/from-account/from-account.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { OwnAccTransferComponent } from '../pages/account/transfer/ft-bic-bic/own-acc-transfer/own-acc-transfer.component';
import { BicAccTransferComponent } from '../pages/account/transfer/ft-bic-bic/bic-acc-transfer/bic-acc-transfer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyLakDirective } from '../services/directives/currency-lak.directive';
import { SharedCurrencyModule } from './module/shared-currency.module';



@NgModule({
  declarations: [FromAccountComponent, OwnAccTransferComponent, BicAccTransferComponent],
  exports:[ FromAccountComponent, OwnAccTransferComponent, BicAccTransferComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    SharedCurrencyModule
  ],
})
export class SharedModule { }
