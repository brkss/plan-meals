import { IRoute } from "../helpers/types/IRoute";
import { LoginPage } from "../pages/auth/Login";
import { RegisterPage } from "../pages/auth/Register";
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
    }
]