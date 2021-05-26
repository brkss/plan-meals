import { IRoute } from "../helpers/types/IRoute";
import { Auth } from "../pages/auth/Auth";
import { LoginPage } from "../pages/auth/Login";
import { RegisterPage } from "../pages/auth/Register";
import { DashPage } from "../pages/Dash";
import { ListDay } from "../pages/day/ListDay";
import { Day } from "../pages/day/Day";
import { CreateGrocery } from "../pages/grocery/CreateGrocery";
import { Grocery } from "../pages/grocery/Grocery";
import { ListGrocery } from "../pages/grocery/ListGrocery";
import { HomePage } from '../pages/Home'
import { CreateRecipe } from "../pages/recipe/CreateRecipe";
import { InfoRecipe } from "../pages/recipe/InfoRecipe";
import { ListRecipe } from "../pages/recipe/ListRecipe";
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
        name: 'Auth',
        path: '/auth',
        exact: false,
        component: Auth,
        protected: false,
        children: [
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
        ]
    },
    {
        name: 'Dashboard Page',
        path: '/dash',
        exact: false,
        component: DashPage,
        protected: true,
    }
]


export const admin_routes : IRoute[] = [
    
    {
        name: 'Grocery',
        path: '/dash/grocery',
        component: Grocery,
        exact: false,
        protected: true,
        children: [
            {
                name: 'List Groceries',
                path: '/dash/grocery/',
                exact: true,
                protected: true,
                component: ListGrocery
            },
            {
                name: 'List Groceries',
                path: '/dash/grocery/list',
                exact: true,
                protected: true,
                component: ListGrocery
            },
            {
                name: 'Create Grocery',
                path: '/dash/grocery/create',
                exact: true,
                protected: true,
                component: CreateGrocery
            },            
        ]
    },
    {
        name: 'Recipe',
        path: '/dash/recipe',
        component: Recipe,
        exact: false,
        protected: true,
        children: [
            {
                name: 'Create Recipe',
                path: '/dash/recipe/create',
                component: CreateRecipe,
                exact: true,
                protected: true,
            },
            {
                name: 'List Recipe',
                path: '/dash/recipe/',
                component: ListRecipe,
                exact: true,
                protected: true,
            },
            {
                name: 'List Recipe',
                path: '/dash/recipe/list',
                component: ListRecipe,
                exact: true,
                protected: true,
            },
            {
                name: 'Recipe Info',
                path: '/dash/recipe/info/:id',
                component: InfoRecipe,
                exact: true,
                protected: true
            }
        ]
    },
    {
        name: 'Day',
        path: '/dash/day',
        component: Day,
        exact: false,
        protected: false,
        children: [
            {
                name: 'Create Day',
                path: '/dash/day/list',
                component: ListDay,
                exact: true,
                protected: true
            },
            {
                name: 'Create Day',
                path: '/dash/day/',
                component: ListDay,
                exact: true,
                protected: true
            }
        ]
    },
    {
        name: 'Settings',
        path: '/settings',
        component: Settings,
        exact: true,
        protected: true
    },
]