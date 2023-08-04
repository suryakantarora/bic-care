import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { StepperComponent } from '../stepper/stepper.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaskitoModule } from '@maskito/angular';
import { DeviceValidationComponent } from './device-validation/device-validation.component';
import { SetUsernamePasswordComponent } from './set-username-password/set-username-password.component';
import { SetMpinComponent } from './set-mpin/set-mpin.component';
import { SetUserDetailComponent } from './set-user-detail/set-user-detail.component';

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
  declarations: [RegisterPage, StepperComponent,
  DeviceValidationComponent, SetUsernamePasswordComponent, SetMpinComponent, SetUserDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterPageModule {}
