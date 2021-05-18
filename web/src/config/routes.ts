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
        component: HomePage,
        protected: false
    },
    {
        name: 'Login Page',
        path: '/auth/login',
        exact: true,
        component: LoginPage,
        protected: false
    },
    {
        name: 'Register Page',
        path: '/auth/register',
        exact: true,
        component: RegisterPage,
        protected: false
    },
    {
        name: 'Dashboard Page',
        path: '/dash',
        exact: false,
        component: DashPage,
        protected: true
    }
]


export const admin_routes : IRoute[] = [
    {
        name: 'Grocery',
        path: '/',
        component: Grocery,
        exact: true,
        protected: true
    },
    {
        name: 'Grocery',
        path: '/grocery',
        component: Grocery,
        exact: true,
        protected: true
    },
    {
        name: 'Recipe',
        path: '/recipe',
        component: Recipe,
        exact: true,
        protected: true
    },
    {
        name: 'Day',
        path: '/days',
        component: Day,
        exact: true,
        protected: true
    },
    {
        name: 'Settings',
        path: '/settings',
        component: Settings,
        exact: true,
        protected: true
    },
]