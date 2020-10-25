import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    {path : '', component : LoginPageComponent},
    {path : 'login'  , component: LoginPageComponent},
    {path : 'layout' , component: LayoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
