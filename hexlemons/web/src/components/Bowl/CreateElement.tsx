import { Center, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, FormControl, DrawerFooter } from '@chakra-ui/react';
import React from 'react';
import { ButtonRegular } from '../Form/ButtonRegular';
import { InputRegular } from '../Form/InputRegular';


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
            <DrawerContent bg="#F4F3E7">
            <DrawerCloseButton />
            <DrawerHeader fontWeight='800'>Create your account</DrawerHeader>

            <DrawerBody>
                <Center height={200} border="3px dashed #00000099" rounded={5} fontWeight='600'>
                    ADD IMAGE?
                </Center>
                <FormControl mt={5}>
                    <InputRegular type='text' placeholder='Title' />
                </FormControl>
                <FormControl mt={5}>
                    <InputRegular type='number' placeholder='Calories' />
                </FormControl>
                <FormControl mt={5}>
                    <ButtonRegular text='ADD ELEMENT.' />
                </FormControl>
               
            </DrawerBody>

            
            </DrawerContent>
        </Drawer>
        </>
    )
}