import React from 'react';
import { Heading, Box, CloseButton, Text, Button } from '@chakra-ui/react';
import { AddIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { InputFonted } from '../Form/InputFonted';
import { Input } from '../Form/InputFonted';
import { ErrorMessage } from '../ErrorMessage';

interface Props {
    next: (key: string, _data: any) => void ;
    back: () => void ;
}

export const Directions : React.FC<Props> = ({next, back}) => {

    const [error, SetError] = React.useState('');
    const [indexKey, SetIndexKey] = React.useState(1)
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
                id: `d-${indexKey + 1}`,
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
        console.log('directions : ', directions)
        directions.splice(directionIndex, 1);
        SetDirection([
            ...directions
        ]);

    }

    // add information tp direction
    const handleDirectionInformation = (e: React.FormEvent<any>, id: string) => {
        const directionIndex = directions.findIndex(x => x.id === id);
        if(directionIndex === -1) return;
        console.log('change this id => ', e.currentTarget.id);
        if(`title-${id}` === e.currentTarget.id){
            directions[directionIndex].title = e.currentTarget.value
        }
        if(`text-${id}` === e.currentTarget.id){
            directions[directionIndex].text = e.currentTarget.value
        }
        
        console.log('directions : ', directions);
        SetDirection([
            ...directions,
        ])
    }

    //handle recipe direction validation 
    const handleRecipeDirectionValidation = () => {
        for(let i = 0 ; i < directions.length; i++){
            if(!directions[i].title){
                SetError('Some direction data are missing!');
                console.log('not valid', directions[i]);
                return;
            }
           
        }
        console.log('valid')
        SetError('')
        next('directions', directions);
    }

    return(
        <>
            <Heading>Add Directions To Your Recipe </Heading>
            {
                error ? 
                <ErrorMessage message={error} /> :
                null
            }
            {
                directions.map((direction, key) => (
                    <Box key={key} w='full' bg='white' border='1px solid #f5f5f5' p={5} rounded={6} mt={7}>
                        <Box d='block'>
                            <Text fontWeight='bold' color='#676666' d='inline-block'>Direction {key + 1}</Text>
                            <CloseButton float='right' onClick={() => handleRemoveDirection(direction.id)}  />
                        </Box>
                        <Box w='full' d='block' mt='5px'>
                            <Input type='text' placeholder='Exp. Cut the avocado' id={`title-${direction.id}`} value={direction.title}  onChange={(e) => handleDirectionInformation(e, direction.id) } style={{fontSize: '20px'}} />
                            <InputFonted type='textarea' placeholder='Exp. cut the avocado into small pieces...' id={`text-${direction.id}`} onChange={(e) => handleDirectionInformation(e, direction.id) } style={{fontSize: '16px'}} />
                        </Box>
                    </Box>

                ))
            }
            
            <Button  rightIcon={<AddIcon />} mt={7} w='full' fontSize={14} colorScheme="teal" variant="outline" onClick={() => handleAddingDirection()} >
                    ADD
            </Button>
            <Button  leftIcon={<ArrowBackIcon />} mt={7} mr={4} colorScheme="teal" variant="outline" onClick={() => back()}>
                    Back
            </Button>
            <Button  rightIcon={<ArrowForwardIcon />} mt={7} colorScheme="teal" variant="outline" onClick={() => handleRecipeDirectionValidation()} >
                    Next
            </Button>
        </>
    );
}