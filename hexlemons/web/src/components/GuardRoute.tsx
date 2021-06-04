import React from 'react';
import { Redirect } from 'react-router-dom';
import { getAccessToken } from '../helpers/constants/token';
import { Route, RouteComponentProps } from 'react-router-dom';
import { IRoute } from '../helpers/types/Route';
import { DEFAULT_REDIR_NOT_AUTH } from '../helpers/constants/defaults';

interface Props {
    route: IRoute
}

export const GuardRoute : React.FC<Props> = ({route}) => {

    if(getAccessToken() === ''){
        return <Redirect to={DEFAULT_REDIR_NOT_AUTH} />
    }
    return <Route path={route.path} exact={route.exact} render={(props: RouteComponentProps) => {
        return <route.component {...props} {...route.props} name={route.name} />
    }} />

}