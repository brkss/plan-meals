import { IRoute } from '../helpers/types/Route';
import { LoginPage } from '../pages/auth/Login';
import { RegisterPage } from '../pages/auth/Register';
import { Bowls } from '../pages/dashboard/Bowl/Bowls';
import { CreateBowl } from '../pages/dashboard/Bowl/CreateBowl';
import { Dashboard } from '../pages/dashboard/dashboard';
import { HomePage } from '../pages/Home';
import { ProfilePage } from '../pages/Profile';

export const routes : IRoute[] = [
    
    {
        name: 'Home page',
        path: '/',
        component: HomePage,
        exact: true,
        protected: false,
    },
    {
        name: 'Login page',
        path: '/auth/login',
        component: LoginPage,
        exact: true,
        protected: false,
    },
    {
        name: 'Register page',
        path: '/auth/register',
        component: RegisterPage,
        exact: true,
        protected: false,
    },
    {
        name: 'DashBoard Page',
        path: '/dash/:d',
        component: Dashboard,
        exact: true,
        protected: false,
        children: [
            {
                name: 'Bowl',
                exact: true,
                component: Bowls,
                path: '/dash/bowls',
                protected: true
            },
            {
                name: 'Create Bowl',
                exact: true,
                component: CreateBowl,
                path: '/dash/create-bowl',
                protected: true
            }
        ]
    },
    {
        name: 'Profile Page',
        path: '/profile',
        component: ProfilePage,
        exact: true,
        protected: true,
    },
    
    
]