import { IRoute } from "../helpers/types/IRoute";
import { LoginPage } from "../pages/auth/Login";
import { RegisterPage } from "../pages/auth/Register";
import { DashPage } from "../pages/Dash";
import { CreateGrocery } from "../pages/grocery/CreateGrocery";
import { ListGrocery } from "../pages/grocery/ListGrocery";
import { HomePage } from '../pages/Home'

export const routes : IRoute[] = [
    {
        name: 'Home page',
        path: '/',
        exact: true,
        component: HomePage
    },
    {
        name: 'Login Page',
        path: '/auth/login',
        exact: true,
        component: LoginPage
    },
    {
        name: 'Register Page',
        path: '/auth/register',
        exact: true,
        component: RegisterPage
    },
    {
        name: 'Dashboard Page',
        path: '/dash',
        exact: false,
        component: DashPage
    }
]


export const admin_routes : IRoute[] = [
    {
        name: 'Create Grocery',
        path: '/grocery/create',
        component: CreateGrocery,
        exact: true,
    },
    {
        name: 'Grocery',
        path: '/grocery/list',
        component: ListGrocery,
        exact: true,
    }
]