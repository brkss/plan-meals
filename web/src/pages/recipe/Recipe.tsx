import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { GruardRoute } from '../../components/GuardRoute';
import { IRoute } from '../../helpers/types/IRoute';

interface Props {
    childrens?: IRoute[]
}

export const Recipe : React.FC<Props> = ({childrens}) => {


    return(
        <>
            Hello this recipe main page
            {
                childrens?.map((route, key) => (
                    route.protected ? 
                    <GruardRoute key={key} route={route} /> : 
                    <Route  key={key} exact={route.exact} path={`${route.path}`} render={(props: RouteComponentProps) => (
                        <route.component {...props} {...route.props} name={route.name}  />
                    )} />
                ))
            }
        </>
    );
}