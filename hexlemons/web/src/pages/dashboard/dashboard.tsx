import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

export const Dashboard : React.FC = () => {

    return(
        <>
            
            <Grid templateColumns="repeat(23, 1fr)" height='100vh' >
                <GridItem colSpan={1} bg="#ACCDC5" borderRight='1px solid #0000002b'>
                
                </GridItem>
                <GridItem colSpan={22} bg="#F4F3E7" >
                
                </GridItem>
            </Grid>
        </>
        
    );
} 