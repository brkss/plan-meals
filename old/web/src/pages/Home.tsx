import React from 'react';
import axios from '../config/axios';
import { URLS } from '../helpers/Constants';
import { RouteComponentProps  } from 'react-router-dom';

export const HomePage : React.FC<RouteComponentProps> = () => {

    React.useEffect(() => {
        axios.post(URLS.user.me, {}).then(res => {
            console.log('me resp => ', res);
        })
        
    }, []);

    return(
        <>
           
           
        
            <h1>Home page</h1>

        </>
        
    );

}

