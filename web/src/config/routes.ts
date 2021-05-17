import { IRoute } from "../helpers/types/IRoute";
import { LoginPage } from "../pages/auth/Login";
import { RegisterPage } from "../pages/auth/Register";
import { DashPage } from "../pages/Dash";
import { Day } from "../pages/day/Day";
import { Grocery } from "../pages/grocery/Grocery";
import { HomePage } from '../pages/Home'
import { Recipe } from "../pages/recipe/Recipe";
import { Settings } from "../pages/settings/Settings";


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
        name: 'Grocery',
        path: '/grocery',
        component: Grocery,
        exact: true,
    },
    {
        name: 'Recipe',
        path: '/recipe',
        component: Recipe,
        exact: true,
    },
    {
        name: 'Day',
        path: '/days',
        component: Day,
        exact: true,
    },
    {
        name: 'Settings',
        path: '/settings',
        component: Settings,
        exact: true,
    },
]