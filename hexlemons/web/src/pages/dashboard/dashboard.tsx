import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { Navigation } from '../../components/Navigation';

export const Dashboard : React.FC = () => {

    return(
        <>
            
            <Grid templateColumns="repeat(36, 1fr)" height='100vh' >
                <GridItem colSpan={2} bg="#ACCDC5" borderRight='1px solid #0000002b' p={5}>
                    <Navigation />
                </GridItem>
                <GridItem colSpan={34} bg="#F4F3E7" >
                
                </GridItem>
            </Grid>
        </>
        
    );
} 