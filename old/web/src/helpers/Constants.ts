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
        list: `${API_URL}/grocery/list`,
        shopList: `${API_URL}/grocery/shop-list`
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
    },
    bowl : {
        create: `${API_URL}/bowl/create`,
        categories: `${API_URL}/bowl/categories`,
        create_category: `${API_URL}/bowl/create-grocery`,
        bowls: `${API_URL}/bowl/bowls`,
        bowls_elements: `${API_URL}/bowl/bowl-elements`,
    }
}