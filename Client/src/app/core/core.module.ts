import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [NavBarComponent, FooterComponent],
  imports: [
    CommonModule,
    CollapseModule.forRoot(),
  ],
  exports: [
    NavBarComponent,
    FooterComponent
    
  ]
})
export class CoreModule { }
