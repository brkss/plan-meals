import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { DashNav } from '../components/DashNav';
import { admin_routes } from '../config/routes';



export const DashPage : React.FC<RouteComponentProps> = ({match}) => {

    return(
        <>
            <Grid
                h="100vh"
                templateColumns="repeat(16, 1fr)"
                gap={0}
            >
                <GridItem colSpan={{md: 1, base: 0}}  >
                    <DashNav />
                </GridItem>
                <GridItem colSpan={{md: 15, base: 16}} ml={7} >
                {
                    admin_routes.map((route, key) => (
                        <Route exact={route.exact} key={key} path={`${match.url}${route.path}`} render={(props: RouteComponentProps) => (
                            <>
                                <route.component {...props} {...route.props} name={route.name} />
                            </>
                        )} />
                    ))
                }
                </GridItem>
            </Grid>
           
        </>
    );
}