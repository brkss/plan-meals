import React from 'react';
import { Box, Button, Text, Grid, GridItem, useDisclosure} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { CreateGrocery } from '../../components/Bowl/CreateGrocery';


export const CreateBowl : React.FC = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()


    return (
        <Box >
            <Box mt={15}>
                <Button leftIcon={<AddIcon />} bg='green.100' _hover={{background: 'green.200'}} onClick={onOpen}>Create Elements ?</Button>
            </Box>
            {/* Category Section */}
            <Box mt={15}>
                <Text fontSize={30} fontWeight='900' textTransform='uppercase'>Start with a base</Text>
                <Grid h="100vh" templateColumns="repeat(12, 1fr)" gap={0}>
                    <GridItem colSpan={{md: 2, base: 0}}  >
                        <Box bg='#F3EEB4' borderRadius={8} p={4}>
                            <img src="https://res.cloudinary.com/sweetgreen/image/fetch/c_scale,w_250/f_auto,q_auto:good/https://res.cloudinary.com/sweetgreen/image/upload/v1621981044/gravy/production/Gravy::Ingredient/2021_02_23_apples_sliced_three_quarter_digital_evergreen_0836_V1_eattnp.png" alt="" />
                            <Box>
                                <Text fontWeight='800'>Apple</Text>
                                <Text fontWeight='400' fontSize={14} opacity={.8}>98cal</Text>
                            </Box>
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
            <CreateGrocery isOpen={isOpen} onClose={onClose} />
        </Box>
    );
}