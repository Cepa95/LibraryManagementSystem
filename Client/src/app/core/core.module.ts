import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({

  declarations: [NavBarComponent, FooterComponent, NotFoundComponent],

  imports: [
    CommonModule,
    CollapseModule.forRoot(),
    RouterModule,
    NgxSpinnerModule
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    NgxSpinnerModule, 
  ]
})
export class CoreModule { }
