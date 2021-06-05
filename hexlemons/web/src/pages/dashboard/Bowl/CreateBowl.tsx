import React from 'react';
import { TopModuleNavigation } from '../../../components/Navs/TopModuleNavigation';
import { MODULE_NAVS } from '../../../helpers/constants/modules_navs';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { ButtonAddElement } from '../../../components/Form/ButtonAddElement';
import { BowlElement } from '../../../components/Bowl/Element';

export const CreateBowl : React.FC = () => {

    

    return(
        <Box>
            <TopModuleNavigation id='CREATE_BOWL' links={MODULE_NAVS.bowl} />
            <Box textAlign='right'>
                
            </Box>
            <Text fontSize='25px' fontWeight='900' textTransform='uppercase' color='#383737'>
                Start With A Base ?
                <ButtonAddElement text="CLICK HERE TO CREATE ELEMENTS ?" />
            </Text>
            <Box>
                <Grid  templateColumns="repeat(12, 1fr)" gap={5} pt={5} mt={4}>
                    <GridItem colSpan={{md: 2, base: 4}}>
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 2, base: 4}}>
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 2, base: 4}}>
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 2, base: 4}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 2, base: 4}}>
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 2, base: 4}}>
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 2, base: 4}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 2, base: 4}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 2, base: 4}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 2, base: 4}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 2, base: 4}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 2, base: 4}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 2, base: 4}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 2, base: 4}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 2, base: 4}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 2, base: 4}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 2, base: 4}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 2, base: 4}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 2, base: 4}} >
                        <BowlElement />
                    </GridItem>
                </Grid>
            </Box>
            
        </Box>
    );  
}