import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';

export const routes: Routes = [
    {path: 'admin/create-survey', loadComponent: () => import('./create-survey/create-survey.component').then(c => c.CreateSurveyComponent)},
    {path: 'admin/preview', loadComponent: () => import('./preview/preview.component').then(c => c.PreviewComponent)},
    { path: 'admin', loadComponent: () => import('./admin/admin.component').then(c => c.AdminComponent)},
    { path: 'user', loadComponent: () => import('./user/user.component').then(c => c.UserComponent)},
    {path: 'login', title: "Login", component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent },
];
