const API_URL = 'http://localhost:4000';

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
        info: `${API_URL}/recipe/info`
    }
}