import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },  {
    path: 'asistencia-alumno',
    loadChildren: () => import('./pages/alumno/asistencia-alumno/asistencia-alumno.module').then( m => m.AsistenciaAlumnoPageModule)
  },
  {
    path: 'asistencia-profesor',
    loadChildren: () => import('./pages/profesor/asistencia-profesor/asistencia-profesor.module').then( m => m.AsistenciaProfesorPageModule)
  },
  {
    path: 'generar-qr',
    loadChildren: () => import('./pages/profesor/generar-qr/generar-qr.module').then( m => m.GenerarQrPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/admin/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'ramos',
    loadChildren: () => import('./pages/admin/ramos/ramos.module').then( m => m.RamosPageModule)
  },
  {
    path: 'estudiantes',
    loadChildren: () => import('./pages/admin/estudiantes/estudiantes.module').then( m => m.EstudiantesPageModule)
  },
  {
    path: 'profesores',
    loadChildren: () => import('./pages/admin/profesores/profesores.module').then( m => m.ProfesoresPageModule)
  },
  {
    path: 'edit-cuenta',
    loadChildren: () => import('./pages/profesor/edit-cuenta/edit-cuenta.module').then( m => m.EditCuentaPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
