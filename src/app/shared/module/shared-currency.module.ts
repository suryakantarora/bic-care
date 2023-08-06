import { LOCALE_ID, NgModule } from '@angular/core';
import { CurrencyLakDirective } from "../../services/directives/currency-lak.directive";
import { CurrencyUsdDirective } from "../../services/directives/currency-usd.directive";
import ptBr from "@angular/common/locales/pt";
import { registerLocaleData } from '@angular/common';
registerLocaleData(ptBr);

@NgModule({
    declarations: [CurrencyLakDirective, CurrencyUsdDirective],
    exports: [CurrencyLakDirective, CurrencyUsdDirective],
    providers: [
      // { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
      { provide: LOCALE_ID, useValue: "pt" }
    ],
  })
  export class SharedCurrencyModule { }