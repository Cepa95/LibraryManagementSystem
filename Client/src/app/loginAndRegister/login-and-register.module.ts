import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginAndRegisterRoutingModule } from './login-and-register-routing.module';




@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    LoginAndRegisterRoutingModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class LoginAndRegisterModule { }
