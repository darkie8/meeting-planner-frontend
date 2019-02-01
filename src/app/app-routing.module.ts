import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './error-pages/error404/error404.component';
import { Error500Component } from './error-pages/error500/error500.component';
import { LoginComponent } from './user-entry/login/login.component';

const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: '*', redirectTo: '/login', pathMatch: 'full' },
{path: 'error404', component: Error404Component},
{path: 'error500', component: Error500Component}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
