import React from 'react'
import { Text, Drawer, Center, DrawerOverlay, Box, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Button } from '@chakra-ui/react';
import { IDayDate } from '../../helpers/types/IDayDate';
import { AddIcon } from '@chakra-ui/icons';

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

                <DrawerBody>
                   node

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