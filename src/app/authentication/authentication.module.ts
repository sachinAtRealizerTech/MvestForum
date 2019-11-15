import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/components/sign-in.component';
import { SignupComponent } from './signup/components/signup.component';
import { ConfirmemailComponent } from './confirmemail/confirmemail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';

@NgModule({
  declarations: [
    SignInComponent,
    SignupComponent,
    ConfirmemailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArchwizardModule
  ],
  exports: [
    SignInComponent,
    SignupComponent,
    ConfirmemailComponent
  ]
})
export class AuthenticationModule { }
