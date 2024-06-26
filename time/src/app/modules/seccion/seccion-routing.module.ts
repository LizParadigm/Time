import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmasPageComponent } from './pages/alarmas-page/alarmas-page.component';
import { AlertaComponent } from './components/alerta/alerta.component';

const routes: Routes = [
  {
    path:'',
    component:AlarmasPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeccionRoutingModule { }
