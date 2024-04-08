import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';



@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    CollapseModule.forRoot()
  ],
  exports: [
    NavBarComponent
    
  ]
})
export class CoreModule { }
