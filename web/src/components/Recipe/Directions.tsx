import React from 'react';
import { Heading, Box, CloseButton, Text, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { InputFonted } from '../Form/InputFonted';


export const Directions : React.FC = () => {

    const [indexKey, SetIndexKey] = React.useState(0)
    const [directions, SetDirection] = React.useState<any []>([
        {
            id: `d-${indexKey}`,
            title: '',
            text: ''
        }
    ]);
    

    // add direction
    const handleAddingDirection = () => {
        SetDirection([
            ...directions,
            {
                id: `i-${indexKey + 1}`,
                title: '',
                text: ''
            }
        ])
        SetIndexKey(indexKey+1);
    }

    // remove direction 
    const handleRemoveDirection = (id: string) => {
        
        const directionIndex = directions.findIndex(x => x.id === id);
        if(directionIndex === -1) return;
        console.log('remove the item with this index => ', directionIndex);
        directions.splice(directionIndex, 1);
        SetDirection([
            ...directions
        ]);

    }

    // add information tp direction
    const handleDirectionInformation = (e: React.FormEvent<any>, id: string) => {
        const directionIndex = directions.findIndex(x => x.id === id);
        if(directionIndex === -1) return;
        directions[directionIndex] = {
            ...directions[directionIndex],
            [e.currentTarget.id]: e.currentTarget.value,
        }
        console.log('directions : ', directions);
        SetDirection([
            ...directions,
        ])
    }

    return(
        <>
            <Heading>Add Directions To Your Recipe </Heading>
            {
                directions.map((direction, key) => (
                    <Box key={key} w='full' bg='white' border='1px solid #f5f5f5' p={5} rounded={6} mt={7}>
                        <Box d='block'>
                            <Text fontWeight='bold' color='#676666' d='inline-block'>{key + 1}</Text>
                            <CloseButton float='right' onClick={() => handleRemoveDirection(direction.id)}  />
                        </Box>
                        <Box w='full' d='block' mt='5px'>
                            <InputFonted type='text' placeholder='Exp. Cut the avocado' id='title' onChange={(e) => handleDirectionInformation(e, direction.id) } style={{fontSize: '20px'}} />
                            <InputFonted type='textarea' placeholder='Exp. cut the avocado into small pieces...' id='text' onChange={(e) => handleDirectionInformation(e, direction.id) } style={{fontSize: '16px'}} />
                        </Box>
                    </Box>

                ))
            }
            
            <Button  rightIcon={<AddIcon />} mt={7} w='full' fontSize={14} colorScheme="teal" variant="outline" onClick={() => handleAddingDirection()} >
                    ADD
            </Button>
        </>
    );
}