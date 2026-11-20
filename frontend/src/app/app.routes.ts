import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./registration/registration-form.component').then((m) => m.RegistrationFormComponent),
    title: 'Register',
  },
  {
    path: 'registrations',
    loadComponent: () =>
      import('./registration/registration-list.component').then((m) => m.RegistrationListComponent),
    title: 'Registrations',
  },
  { path: '**', redirectTo: '' },
];
