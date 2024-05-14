import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginAndRegisterRoutingModule } from './login-and-register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, LogoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoginAndRegisterRoutingModule,
    ReactiveFormsModule,

  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
  ]
})
export class LoginAndRegisterModule { }
