import React from 'react';
import { IRoute } from '../../helpers/types/IRoute';
import { Route, RouteComponentProps } from 'react-router-dom';
import { GruardRoute } from '../../components/GuardRoute';
import { ModuleNavigation } from '../../components/ModuleNavigation';

interface Props {
    childrens: IRoute[],
}

export const Settings : React.FC<Props> = ({childrens}) => {

 
    const links = [
        {
            name: 'Profile',
            link: '/settings/'
        }
        
    ];
    console.log('childrens => ', childrens);
    return(
        <> 
            <ModuleNavigation links={links} />
                {
                    childrens.map((route, key) => (
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