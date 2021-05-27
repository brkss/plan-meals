import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { GruardRoute } from '../../components/GuardRoute';
import { ModuleNavigation } from '../../components/ModuleNavigation';
import { IRoute } from '../../helpers/types/IRoute';
import { Box } from '@chakra-ui/react';

interface Props {
    childrens?: IRoute[]
}

export const Recipe : React.FC<Props> = ({childrens}) => {

    const links = [
        {
            name: 'Create Recipes',
            link: '/dash/recipe/create',
        },
        {
            name: 'My Recipes',
            link: '/dash/recipe/list'
        }
        
    ];

    

    return(
        <Box mt={10} mb={10}>
             <ModuleNavigation links={links} />
            {
                childrens?.map((route, key) => (
                    route.protected ? 
                    <GruardRoute key={key} route={route} /> : 
                    <Route  key={key} exact={route.exact} path={`${route.path}`} render={(props: RouteComponentProps) => (
                        <route.component {...props} {...route.props} name={route.name}  />
                    )} />
                ))
            }
        </Box>
    );
}