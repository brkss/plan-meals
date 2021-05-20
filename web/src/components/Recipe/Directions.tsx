import React from 'react';
import { Heading, Box, CloseButton, Text } from '@chakra-ui/react';
import { InputFonted } from '../Form/InputFonted';


export const Directions : React.FC = () => {


    return(
        <>
            <Heading>Add Directions To Your Recipe </Heading>
            <Box  w='full' bg='white' border='1px solid #f5f5f5' p={5} rounded={6} mt={7}>
                <Box d='block'>
                    <Text fontWeight='bold' color='#676666' d='inline-block'>1</Text>
                    <CloseButton float='right'  />
                </Box>
                <Box w='full' d='block' mt='5px'>
                    <InputFonted type='text' placeholder='Exp. Cut the avocado' id='title' onChange={() => {}} style={{fontSize: '20px'}} />
                    <InputFonted type='textarea' placeholder='Exp. cut the avocado into small pieces...' id='description' onChange={() => {}} style={{fontSize: '16px'}} />
                </Box>
            </Box>
        </>
    );
}