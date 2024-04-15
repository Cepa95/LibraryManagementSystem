import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LibraryComponent } from './library.component';
import { BookItemComponent } from './book-item/book-item.component';
import { BookDetailsComponent } from './book-details.component';
import { RouterModule } from '@angular/router';
import { LibraryRoutingModule } from './library-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UpdateBookComponent } from './update-book/update-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddBookComponent } from './add-book/add-book.component';



@NgModule({
  declarations: [
    LibraryComponent,
    BookItemComponent,
    BookDetailsComponent,
    UpdateBookComponent,
    AddBookComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LibraryRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule
  ]

})
export class LibraryModule { }
