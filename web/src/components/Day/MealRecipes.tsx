import React from 'react'
import { Text, Drawer, Center, DrawerOverlay, Box, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Button } from '@chakra-ui/react';
import { IDayDate } from '../../helpers/types/IDayDate';
import { AddIcon } from '@chakra-ui/icons';
import { CgBowl } from 'react-icons/all';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const MealRecipes : React.FC<Props> = ({isOpen, onClose}) => {



    return(

        <>
            
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                size='lg'
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Recipes</DrawerHeader>

                <DrawerBody >
                   <Input variant='filled' placeholder='Search..' />
                    <Box>
                        <Box bg='gray.50' p={3} mt={3} cursor='pointer' rounded={6}>
                            <Text><CgBowl /></Text>
                            <Text fontWeight='bold'>Pasta with Creamy Crushed Walnut Sauce</Text>
                            <Text>Toasted walnuts pounded with garlic into a creamy sauce make this pasta easy and exceptional. If you have dried pasta, a few cl...</Text>
                        </Box>
                        <Box bg='gray.50' p={3} mt={3} cursor='pointer' rounded={6}>
                            <Text><CgBowl /></Text>
                            <Text fontWeight='bold'>Pasta with Creamy Crushed Walnut Sauce</Text>
                            <Text>Toasted walnuts pounded with garlic into a creamy sauce make this pasta easy and exceptional. If you have dried pasta, a few cl...</Text>
                        </Box>
                        <Box bg='gray.50' p={3} mt={3} cursor='pointer' rounded={6}>
                            <Text><CgBowl /></Text>
                            <Text fontWeight='bold'>Pasta with Creamy Crushed Walnut Sauce</Text>
                            <Text>Toasted walnuts pounded with garlic into a creamy sauce make this pasta easy and exceptional. If you have dried pasta, a few cl...</Text>
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