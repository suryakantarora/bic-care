import { LOCALE_ID, NgModule } from '@angular/core';
import { CurrencyMaskDirective } from "../../services/directives/currency-mask.directive";
import { CurrencyI18nDirective } from "../../services/directives/currency-i18n.directive";
import ptBr from "@angular/common/locales/pt";
import { registerLocaleData } from '@angular/common';
registerLocaleData(ptBr);

@NgModule({
    declarations: [CurrencyMaskDirective, CurrencyI18nDirective],
    exports: [CurrencyMaskDirective, CurrencyI18nDirective],
    providers: [
      // { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
      { provide: LOCALE_ID, useValue: "pt" }
    ],
  })
  export class SharedCurrencyModule { }