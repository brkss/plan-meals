import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { GruardRoute } from '../../components/GuardRoute';
import { ModuleNavigation } from '../../components/ModuleNavigation';
import { IRoute } from '../../helpers/types/IRoute';


interface Props {
    childrens: IRoute[],
}

export const Day : React.FC<Props> = ({childrens}) => {


    const links = [
        {
            name: 'Create Day',
            link: '/dash/day/create',
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