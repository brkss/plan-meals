import React from 'react';
import { BrowserRouter, Switch, Route, RouteComponentProps} from 'react-router-dom';
import { GuardRoute } from './components/GuardRoute';
import { routes } from './config/routes';
import { getAccessToken, SetAccessToken } from './helpers/constants/token';
import { Center } from '@chakra-ui/react';

export const Application : React.FC = () => {
    //

    const [loading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
        fetch('http://localhost:4000/refresh_user_token',{
            credentials: 'include',
            method: 'POST'
        }).then(async res => {
            const data = await res.json();
            if(data.status === true){
                SetAccessToken(data.accessToken);
                console.log('access token', getAccessToken());
            } 
            console.log('refresh token result => ', data);
            
            setLoading(false);
        });
    }, []);

    if(loading) return <Center height='100vh'>Loading</Center>;

    return(
        <>
            <BrowserRouter>
                <Switch>
                    {
                        routes.map((route, key) => (
                            route.protected ? 
                            <GuardRoute route={route} key={key} /> :  
                            <Route key={key} path={route.path} exact={route.exact} render={(props: RouteComponentProps) => {
                                return <route.component {...props} {...route.props} name={route.name} />
                            }} />
                        ))
                    }
                </Switch>
            </BrowserRouter>
        </>
    );
}