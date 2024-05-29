import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { SettingPageComponent } from '@modules/setting/pages/setting-page/setting-page.component';

const routes: Routes = [
  {
    path:'',
    component:MenuComponent
  },
  {
    path:'seccion',
    loadChildren:() => import('@modules/seccion/seccion.module').then(module => module.SeccionModule)
  },
  {
    path:'ajustes',
    component:SettingPageComponent,
    loadChildren:() => import('@modules/setting/setting.module').then(module => module.SettingModule)
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
