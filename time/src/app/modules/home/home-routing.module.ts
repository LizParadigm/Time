import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {
    path:'',
    component:MenuComponent
  },
  {
    path:'seccion',
    loadChildren:() => import('@modules/seccion/seccion.module').then(module => module.SeccionModule)
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
