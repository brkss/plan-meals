import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter } from '@chakra-ui/react';
import React from 'react';

interface Props {
    isOpen: boolean,
    onClose: () => void
}

export const CreateGrocery : React.FC<Props> = ({isOpen, onClose}) => {

    //const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>

          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
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