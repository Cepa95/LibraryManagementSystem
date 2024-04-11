import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({

  declarations: [NavBarComponent, FooterComponent, NotFoundComponent,LoginComponent],

  imports: [
    CommonModule,
    CollapseModule.forRoot(),
    RouterModule,
    NgxSpinnerModule
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    LoginComponent,
    NgxSpinnerModule

    
  ]
})
export class CoreModule { }
