import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { Navigation } from '../../components/Navs/Navigation';
import { IRoute } from '../../helpers/types/Route';
import { GuardRoute } from '../../components/GuardRoute';

interface Props {
    childrens: IRoute[]
}

export const Dashboard : React.FC<Props> = ({childrens}) => {

    console.log('childrens =>  ', childrens);
    return(
        <>
            
            <Grid templateColumns="repeat(36, 1fr)" height='100vh' >
                <GridItem colSpan={2} bg="#ACCDC5" borderRight='1px solid #0000002b' p={5}>
                    <Navigation />
                </GridItem>
                <GridItem colSpan={34} pt={7} pl={8} pr={8} bg="#F4F3E7" >
                    {
                        childrens.map((route, key) => (
                            <GuardRoute route={route} key={key} />
                        ))
                    }
                </GridItem>
            </Grid>
        </>
        
    );
} 