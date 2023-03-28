import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { AuthGuard } from './components/auth/auth.guard';


export const appRoutes: Routes = [
    {
        path: 'signup',
        component: SignupComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'login',
        component: LoginComponent,
       // children: [{path:'', component: LoginComponent}]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
]