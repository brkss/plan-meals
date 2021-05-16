import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { admin_routes } from '../config/routes';



export const DashPage : React.FC<RouteComponentProps> = ({match}) => {

    return(
        <>
            <Grid
                h="100vh"
                
                templateColumns="repeat(10, 1fr)"
                gap={0}
            >
                <GridItem colSpan={1}  bg="tomato">
                    nav
                </GridItem>
                <GridItem colSpan={9} bg="blue.500">
                    content
                </GridItem>
            </Grid>
            {
                admin_routes.map((route, key) => (
                    <Route exact={route.exact} key={key} path={`${match.url}${route.path}`} render={(props: RouteComponentProps) => (
                        <>
                            <route.component {...props} {...route.props} name={route.name} />
                        </>
                    )} />
                ))
            }
        </>
    );
}