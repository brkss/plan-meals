import React from 'react';
import { Box, Input, Heading, Button, CloseButton, Text } from '@chakra-ui/react';
import styled from 'styled-components';
import { ArrowForwardIcon, ArrowBackIcon, AddIcon } from '@chakra-ui/icons';
import { AutoCompleteInput } from '../Form/AutoCompleteGrocery';
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';
import { IGrocery } from '../../helpers/types/IGrocery';
import { ErrorMessage } from '../ErrorMessage';

interface Props {
    next: (key: string, _data: any) => void;
    back: () => void;
}


export const Ingredients : React.FC<Props> = ({next, back}) => {

    const [error, SetError] = React.useState('');
    const [ingredients, SetIngredients] = React.useState<any[]>([
        {
            id: `i-1`,
            unit: '',
            grocery: {
                value: '',
                label: 'Grocery..'
            }
        }
    ]);
    
    // add ingredients
    const handleAddingIngredients = () => {
        SetIngredients([
            ...ingredients,
            {
                id: `i-${ingredients.length+1}`,
                unit: '',
                grocery: {
                    value: '',
                    label: 'Grocery..'
                }
            }
        ]);
    }

    // delete item 
    const deleteIngredient = (id: string) => {
        const ingredientIndex = ingredients.findIndex(x => x.id === id);
        if(ingredientIndex === -1 || ingredients.length === 1) return;
        console.log('ing before delete => ', ingredients);
        ingredients.splice(ingredientIndex, 1);
        console.log('ing after delete => ', ingredients);
        SetIngredients([
            ...ingredients
        ])
    }

    // handle affecting grocery to ingredient 
    const handleAddingGroceryToIngredient = (id: string, item: any) => {
        console.log('id => ', id);
        console.log('item => ', item);
        const ingredientIndex = ingredients.findIndex(x => x.id === id);
        if(ingredientIndex === -1 || item.length === 0) return;
        ingredients[ingredientIndex].grocery.label = item[0].label;
        ingredients[ingredientIndex].grocery.value = item[0].value;
        SetIngredients([
            ...ingredients
        ]);
    }

    // handle affecting unit to ingredient
    const handleUnitForIngredient = (id: string, e: React.FormEvent<HTMLInputElement>) => {
        const ingredientIndex = ingredients.findIndex(x => x.id === id);
        const unit = e.currentTarget.value;
        if(ingredientIndex === -1 || !unit) return;
        ingredients[ingredientIndex].unit = unit;
        SetIngredients([
            ...ingredients
        ]);
    }


    // List Grocery 
    const [listGrocery, SetListGrocery] = React.useState<any []>();
    const [loading, SetLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        SetLoading(true)
        axios.post(URLS.grocery.list, {}).then(resp => {
            const data = resp.data;
            console.log('list => ', data);
            if(data.status === true){
                SetListGrocery(data.data);
            }
            SetLoading(false)
        });
        
    }, []);


    //handle ingredient array validation
    const handleIngredientsVaidation = () => {
        for(let i = 0 ; i < ingredients.length; i++){
            if(!ingredients[i].unit || !ingredients[i].grocery.label || !ingredients[i].grocery.value){
                SetError('Some ingredients data are missing!');
                console.log('not valid', ingredients[i]);
                return;
            }
           
        }
        console.log('valid')
        SetError('')
        next('ingredients', ingredients);
    }

    if(loading){
        return <>Loading</>
    }

    return (
        <Box mb={15}>
            <Heading mb={5} fontWeight='bold'>Add Ingredients</Heading>
            {
                error ? 
                <ErrorMessage message={error} /> :
                null
            }
            {
                ingredients.map((ing, key) => (
                    <Box key={key} w='full' bg='white' border='1px solid #f5f5f5' p={5} rounded={6} mt={7}>
                        <Box d='block'>
                            <Text fontWeight='bold' color='#676666' d='inline-block'>Ingredient</Text>
                            <CloseButton float='right' onClick={() => deleteIngredient(ing.id)} />
                        </Box>
                        <Box w='full' d='block' mt='5px'>
                            <Input type="text" variant='filled' w={{md: '27%', base: '100%'}} mr={4} placeholder='Unit'  onChange={(e) => handleUnitForIngredient(ing.id, e)} />  
                            <Input type="text" variant='filled' readOnly={true} disabled={true} value={ing.grocery.label} w={{md: '60%', base: '100%'}} placeholder='Grocery' /> 
                            <AutoCompleteInput groceries={listGrocery as IGrocery[]} onChange={(i) => handleAddingGroceryToIngredient(ing.id, i)} />
                        </Box>
                    </Box>
                ))
            }

            {/* <AddButton onClick={handleAddingIngredients}>Add</AddButton> */}
            <Button  rightIcon={<AddIcon />} mt={7} w='full' fontSize={14} onClick={handleAddingIngredients} colorScheme="teal" variant="outline">
                    ADD
            </Button>

            <Button  leftIcon={<ArrowBackIcon />} mt={7} mr={4} colorScheme="teal" variant="outline" onClick={() => back()}>
                    Back
            </Button>
            <Button  rightIcon={<ArrowForwardIcon />} mt={7} colorScheme="teal" variant="outline" onClick={() => handleIngredientsVaidation()} >
                    Next
            </Button>
        </Box>
    );
}

