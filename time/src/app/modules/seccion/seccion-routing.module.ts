import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmasPageComponent } from './pages/alarmas-page/alarmas-page.component';

const routes: Routes = [
  {
    path:'alarmas',
    component:AlarmasPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeccionRoutingModule { }
