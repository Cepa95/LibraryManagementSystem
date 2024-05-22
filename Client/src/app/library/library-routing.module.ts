import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library.component';
import { BookDetailsComponent } from './book-details.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { AddBookComponent } from './add-book/add-book.component';

const routes: Routes = [
  { path: '', component: LibraryComponent },
  { path: 'update/:id', component: UpdateBookComponent },
  { path: 'add', component: AddBookComponent },
  { path: ':id', component: BookDetailsComponent },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class LibraryRoutingModule { }
