import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { getAccessToken } from '../helpers/auth/token';
import { IRoute } from '../helpers/types/IRoute';

interface Props {
    route: IRoute,
}

export const GruardRoute : React.FC<Props> = ({route}) => {

    if(getAccessToken() === ''){
        return (<Redirect to='/auth/login' />) ;
    }

    return(
        <Route exact={route.exact} path={`${route.path}`} render={(props: RouteComponentProps) => (
                <route.component {...props} {...route.props} name={route.name}  />
        )} />
    )

}