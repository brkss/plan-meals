import React from 'react'
import { useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Button } from '@chakra-ui/react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    date: Date;
}

export const DayMeals : React.FC<Props> = ({isOpen, onClose, date}) => {

    //const { isOpen, onOpen, onClose } = useDisclosure()


    return(

        <>
            
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                size='xl'
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Meals</DrawerHeader>

                <DrawerBody>
                    
                    {date?.toString()}
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