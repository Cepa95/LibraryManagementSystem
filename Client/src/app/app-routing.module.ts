import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { LibraryComponent } from './library/library.component';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
  // path:'home',component:,
  // path:'library',component:,
  // path:'about',component:,
  // path: 'login', component: LoginComponent ,
  
  	// {path:'',component:}
    //  { path:'login', loadChildren:()=>import('./login/login.module').then(l=>l.LoginModule)
    {path: '', component: LibraryComponent},
    {path: 'login', component: LoginComponent}

  
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }