import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library.component';
import { BookDetailsComponent } from './book-details.component';

const routes: Routes = [
  { path: '', component: LibraryComponent },
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
