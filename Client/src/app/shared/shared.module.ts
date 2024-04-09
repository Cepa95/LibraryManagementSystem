import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CountHeaderComponent } from './count-header/count-header.component';



@NgModule({
  declarations: [CountHeaderComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),

  ],
  exports: [
    PaginationModule,
    CountHeaderComponent
  ]
})
export class SharedModule { }
