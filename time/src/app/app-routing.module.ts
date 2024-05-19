import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './modules/auth/pages/auth-page/auth-page.component';
import { HomePageComponent } from '@modules/home/pages/home-page/home-page.component';
import { HomeModule } from '@modules/home/home.module';

const routes: Routes = [
  {
    path:'auth',
    component:AuthPageComponent,
    loadChildren:()=> import('@modules/auth/auth.module').then(module => module.AuthModule)
  },
  {
    path:'home',
    component:HomePageComponent,
    loadChildren:() => import('@modules/home/home.module').then(module => module.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
