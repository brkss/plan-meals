import axios from 'axios';
import { getAccessToken, setAccessToken } from '../helpers/auth/token';
import jwtDecode from 'jwt-decode';

const  axiosApiInstense = axios.create();

axiosApiInstense.interceptors.request.use(
    async config => {
        config.headers = { 
            'Authorization': `Bearer ${getAccessToken()}`,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        const token = getAccessToken();
        try {
            const {exp} = jwtDecode(token) as any;
            if(Date.now() <= exp * 1000){
                return config;
            }
        }catch(e){
            return config;
        }
        console.log('REFRESF TOKEN');
        config.headers = { 
          'Authorization': `Bearer ${getAccessToken()}`,
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
        return config;
      },
      error => {
        Promise.reject(error)
    
    })

    axios.defaults.withCredentials = true;
    axios.interceptors.request.use(async (config) => {
        config.headers = { 
            'Authorization': `Bearer ${getAccessToken()}`,
            'Accept': 'application/json',
        }
        const token = getAccessToken();
        try{
            const {exp} = jwtDecode(token) as any;
            if(Date.now() <= exp * 1000){
                return config;
            }
        }catch {
            //
        }
        await fetch("http://localhost:4000/user/refresh_token", {
            method: "POST",
            credentials: "include"
        }).then(async res => {
            const data = await res.json();
            if(data.status === true && data.accessToken){
                setAccessToken(data.accessToken)
            }
        });
        
        

        config.headers = { 
            'Authorization': `Bearer ${getAccessToken()}`,
            'Accept': 'application/json',
        }
        return config;
    });

//axios.defaults.headers = {"Authorization": `bearer ${getAccessToken()}` }

export default axios;