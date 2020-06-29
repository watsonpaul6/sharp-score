import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { CoreModule } from 'src/app/core/core.module';
import { CredentialMatchDirective } from './directives/credential-match/credential-match.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    
    CoreModule
  ],
  declarations: [RegisterPage, CredentialMatchDirective]
})
export class RegisterPageModule {}
