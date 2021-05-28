export const API_URL = 'http://localhost:4000';
export const CDN_URL = 'http://localhost:4000';

export const URLS = {
    user : {
        login: `${API_URL}/user/login`,
        register: `${API_URL}/user/register`,
        me: `${API_URL}/user/me`
    },
    grocery: {
        categories: `${API_URL}/grocery/categories`,
        create: `${API_URL}/grocery/create`,
        list: `${API_URL}/grocery/list`
    },
    recipe: {
        create: `${API_URL}/recipe/create`,
        list: `${API_URL}/recipe/list`,
        info: `${API_URL}/recipe/info`,
        createFromUrl: `${API_URL}/recipe/create-from-url`,
        delete: `${API_URL}/recipe/delete`
    },
    day: {
        create: `${API_URL}/day/create`,
        check: `${API_URL}/day/check`,
        add_recipe_to_meal: `${API_URL}/day/add-recipe-to-meal`,
        delete_meal: `${API_URL}/day/delete-meal`,
        create_meal: `${API_URL}/day/add-meal`,
        delete_recipe_from_meal: `${API_URL}/day/delete-recipe-from-meal`
    }
}