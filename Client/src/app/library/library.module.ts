import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LibraryComponent } from './library.component';
import { BookItemComponent } from './book-item/book-item.component';



@NgModule({
  declarations: [
    LibraryComponent,
    BookItemComponent
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
