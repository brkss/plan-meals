import React from 'react';
import { BrowserRouter, Switch, Route, RouteComponentProps } from 'react-router-dom';
import { ThemeToggler } from './components/themeToggler';
import { routes } from './config/routes';

export const Application : React.FC = () => {

    return(
        <BrowserRouter>
            <ThemeToggler />
            <Switch>
                
                {
                    routes.map((route, key) => (
                        <Route  key={key} exact={route.exact} path={route.path} render={(props: RouteComponentProps) => (
                            <route.component {...props} {...route.props} name={route.name}  />
                        )} />
                    ))
                }
            </Switch>
        </BrowserRouter>
    );

}