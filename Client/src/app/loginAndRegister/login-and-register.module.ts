import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginAndRegisterRoutingModule } from './login-and-register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoginAndRegisterRoutingModule,
    ReactiveFormsModule

  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class LoginAndRegisterModule { }
