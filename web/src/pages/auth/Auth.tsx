import React from 'react';
import {Route, RouteComponentProps, Switch, } from 'react-router-dom';
import { GruardRoute } from '../../components/GuardRoute';
import { IRoute } from '../../helpers/types/IRoute';

interface Props {
    children: IRoute[];
}

export const Auth : React.FC<Props> = ({children}) => {


    return(
        <>
            <Switch>                
                {
                    children.map((route, key) => (
                        route.protected ? 
                        <GruardRoute route={route} /> : 
                        <Route  key={key} exact={route.exact} path={route.path} render={(props: RouteComponentProps) => (
                            <route.component {...props} {...route.props} name={route.name}  />
                        )} />
                    ))
                }
            </Switch>
        </>
    );
}