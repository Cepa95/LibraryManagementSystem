import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LibraryComponent } from './library.component';
import { BookItemComponent } from './book-item/book-item.component';
import { BookDetailsComponent } from './book-details.component';
import { RouterModule } from '@angular/router';
import { LibraryRoutingModule } from './library-routing.module';



@NgModule({
  declarations: [
    LibraryComponent,
    BookItemComponent,
    BookDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LibraryRoutingModule
  ]

})
export class LibraryModule { }
