import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanComponent } from './loan.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'loan', component: LoanComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class LoanRoutingModule { }
