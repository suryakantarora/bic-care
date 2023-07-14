import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { StepperComponent } from '../stepper/stepper.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaskitoModule } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    MaskitoModule
  ],
  declarations: [RegisterPage, StepperComponent]
})
export class RegisterPageModule {}
