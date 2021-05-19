import React from 'react';
import { Box, Input, Heading, Button, CloseButton, Text } from '@chakra-ui/react';
import styled from 'styled-components';


export const Ingredients : React.FC = () => {

    const [ingredients, SetIngredients] = React.useState<string[]>(['i-1']);
    const handleAddingIngredients = () => {
        SetIngredients([
            ...ingredients,
            `i-${ingredients.length}`
        ]);
    }

    return (
        <Box>
            <Heading mb={5} fontWeight='bold'>Add Ingredients</Heading>
            {
                ingredients.map((ingId, key) => (
                    <Box key={key} w='full' bg='gray.100' p={5} rounded={6} mt={7}>
                        <Box d='block'>
                            <Text fontWeight='bold' color='#676666' d='inline-block'>Add Ingredient</Text>
                            <CloseButton float='right' />
                        </Box>
                        <Box w='full' d='block' mt='5px'>
                            <Input type="text" variant='filled' w={{md: '17%', base: '100%'}} mr={4} placeholder='Unit' />  
                            <Input type="text" variant='filled' w={{md: '70%', base: '100%'}} placeholder='Grocery' /> 
                        </Box>
                    </Box>
                ))
            }
           

            <AddButton onClick={handleAddingIngredients}>Add</AddButton>
            
        </Box>
    );
}


const AddButton = styled.button`

    text-align: 100%;
    width: 100%;
    padding: 7px;
    border: 1px dotted #00000061;
    margin-top: 13px;
    border-radius: 5px;
    font-weight: bold;

`;