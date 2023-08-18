import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { ServicesGuard } from './services.guard';
import { UsuariologeadoGuard } from './usuariologeado.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    // canLoad : [ ServicesGuard],
    // canActivate : [ServicesGuard]
  },
  { 
    path: 'main', 
    loadChildren: () => import('../app/pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad : [ UsuariologeadoGuard],
    canActivate : [ServicesGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
