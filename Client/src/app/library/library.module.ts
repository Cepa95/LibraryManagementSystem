import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LibraryComponent } from './library.component';



@NgModule({
  declarations: [
    LibraryComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LibraryComponent
  ]
})
export class LibraryModule { }
