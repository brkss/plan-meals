import React from 'react';
import { TopModuleNavigation } from '../../../components/Navs/TopModuleNavigation';
import { MODULE_NAVS } from '../../../helpers/constants/modules_navs';
import { Box, Grid, GridItem, Text, useDisclosure } from '@chakra-ui/react';
import { ButtonAddElement } from '../../../components/Form/ButtonAddElement';
import { BowlElement } from '../../../components/Bowl/Element';
import { InputRegular } from '../../../components/Form/InputRegular';
import { CreateElement } from '../../../components/Bowl/CreateElement';

export const CreateBowl : React.FC = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <Box>
            <TopModuleNavigation id='CREATE_BOWL' links={MODULE_NAVS.bowl} />
            <Box textAlign='right'>
                
            </Box>
            <Text fontSize='25px' fontWeight='900' textTransform='uppercase' color='#383737'>
                Start With A Base ?
                <ButtonAddElement text="CLICK HERE TO CREATE ELEMENTS ?" onClick={() => onOpen()} />
            </Text>
            <Box w={{md: '30%', base: '100%'}} mt={3}>
                <InputRegular type='text' placeholder='Search'  />
            </Box>
            <Box>
                <Grid  templateColumns="repeat(21, 1fr)" gap={5} pt={5} mt={4}>
                    <GridItem colSpan={{md: 3, base: 7}}>
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 3, base: 7}}>
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 3, base: 7}}>
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 3, base: 7}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 3, base: 7}}>
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 3, base: 7}}>
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 3, base: 7}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 3, base: 7}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 3, base: 7}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 3, base: 7}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 3, base: 7}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 3, base: 7}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 3, base: 7}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 3, base: 7}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 3, base: 7}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 3, base: 7}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 3, base: 7}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 3, base: 7}} >
                        <BowlElement />
                    </GridItem>
                    <GridItem colSpan={{md: 3, base: 7}} >
                        <BowlElement />
                    </GridItem>
                </Grid>
            </Box>
            <CreateElement isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        </Box>
    );  
}