import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { LoanComponent } from './loanComponent/loan/loan.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'library', loadChildren: () => import('./library/library.module').then(m => m.LibraryModule) },
  {path:'about',component:AboutComponent},
  { path: 'account', loadChildren: () => import('./loginAndRegister/login-and-register.module').then(m => m.LoginAndRegisterModule) },
  { path: 'loan', component: LoanComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
