import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';
import { RecentComponent } from './recent.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [RecentComponent],
  exports:[ RecentComponent]
})
export class RecentPageModule {}
