import React from 'react'
import { useDisclosure, Text, Drawer, Center, DrawerOverlay, Box, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Button } from '@chakra-ui/react';
import { IDayDate } from '../../helpers/types/IDayDate';
import { AddIcon } from '@chakra-ui/icons';
import { MealRecipes } from './MealRecipes';

interface Props {
    isOpenMeal: boolean;
    onCloseMeal: () => void;
    day: IDayDate;
}

export const DayMeals : React.FC<Props> = ({isOpenMeal, onCloseMeal, day}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();


    return(

        <>
            <MealRecipes isOpen={isOpen} onClose={onClose} />
            <Drawer
                isOpen={isOpenMeal}
                placement="right"
                onClose={onCloseMeal}
                size='xl'
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Meals</DrawerHeader>

                <DrawerBody>
                   <Text fontWeight='bold' fontSize='22px'> {day?.name}  {day?.date}, {day?.month} </Text>
                    <Box p={3} background='gray.50' rounded={6} mt={5}>
                        <Text fontWeight='bold'>Breakfast</Text>
                        <Box p={3} bg='gray.100' rounded={6} mt={3}>
                            <Text fontWeight='bold' opacity={.8} > Avocado Salad </Text>
                        </Box>
                        <Box p={3} bg='gray.100' rounded={6} mt={3}>
                            <Text fontWeight='bold' opacity={.8} > Avocado Salad </Text>
                        </Box>
                        <Box p={3} bg='gray.100' rounded={6} mt={3}>
                            <Text fontWeight='bold' opacity={.8} > Avocado Salad </Text>
                        </Box>
                        <Box p={3} bg='gray.100' rounded={6} mt={3} border='1px dotted #ababab' cursor='pointer' 
                            onClick={onOpen}
                        >
                            <Center>
                                <AddIcon />
                            </Center>
                        </Box>
                    </Box>

                </DrawerBody>

                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue">Save</Button>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}