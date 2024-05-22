import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, CarouselModule.forRoot()],
  exports: [AboutComponent],
})
export class HomeModule {}
