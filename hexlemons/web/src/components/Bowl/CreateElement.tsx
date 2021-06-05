import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter } from '@chakra-ui/react';
import React from 'react';


interface Props {
    isOpen : boolean
    onOpen: () => void,
    onClose: () => void
}

export const CreateElement : React.FC<Props> = ({onOpen, onClose, isOpen}) => {


    return (
        <>
        
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            size='md'
            >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
                <Input placeholder="Type here..." />
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
    )
}