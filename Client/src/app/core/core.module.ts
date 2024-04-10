import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [NavBarComponent, FooterComponent,LoginComponent],
  imports: [
    CommonModule,
    CollapseModule.forRoot(),
    RouterModule,
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    LoginComponent
    
  ]
})
export class CoreModule { }
