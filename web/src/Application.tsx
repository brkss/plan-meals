import React from 'react';
import { BrowserRouter, Switch, Route, RouteComponentProps } from 'react-router-dom';
import { GruardRoute } from './components/GuardRoute';
import { ThemeToggler } from './components/themeToggler';
import { routes } from './config/routes';
import { setAccessToken } from './helpers/auth/token';

export const Application : React.FC = () => {

    const [loading, SetLoading] = React.useState(true);
    React.useEffect(() => {
        fetch("http://localhost:4000/user/refresh_token", {
            method: "POST",
            credentials: "include"
        }).then(async res => {
            const data = await res.json();
            if(data.status === true && data.accessToken){
                setAccessToken(data.accessToken)
            }
            SetLoading(false);
        });
    }, []);

    if(loading){
        return <>Loading...</>
    }

    return(
        <BrowserRouter>
            <ThemeToggler />
            <Switch>
                
                {
                    routes.map((route, key) => (
                        route.protected ? 
                        <GruardRoute key={key} route={route} /> : 
                        <Route  key={key} exact={route.exact} path={route.path} render={(props: RouteComponentProps) => (
                            <route.component {...props} {...route.props} name={route.name} children={route.children} />
                        )} />
                    ))
                }
            </Switch>
        </BrowserRouter>
    );

}