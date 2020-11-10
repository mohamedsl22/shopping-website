import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderComponent} from './order/order.component'
import {MainPageComponent} from './main-page/main-page.component'
import {LoginComponent} from './login/login.component'
import {SignUpComponent } from './sign-up\/sign-up.component'

const routes: Routes = [
  {path:'Order',component:OrderComponent},
  {path:'Main',component:MainPageComponent},
  {path:'LogIn',component:LoginComponent},
  {path:'signUp',component:SignUpComponent},
  {path: '',   redirectTo: '/LogIn', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [LoginComponent,MainPageComponent,OrderComponent]