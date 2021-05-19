import React from 'react';
import { Box, Input, Heading, Button, CloseButton, Text } from '@chakra-ui/react';
import styled from 'styled-components';
import { ArrowForwardIcon, PlusSquareIcon, AddIcon } from '@chakra-ui/icons';
import { AutoCompleteInput } from '../Form/AutoCompleteGrocery';
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';
import { IGrocery } from '../../helpers/types/IGrocery';

export const Ingredients : React.FC = () => {

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

    if(loading){
        return <>Loading</>
    }

    return (
        <Box>
            <Heading mb={5} fontWeight='bold'>Add Ingredients</Heading>
            {
                ingredients.map((ing, key) => (
                    <Box key={key} w='full' bg='gray.50' p={5} rounded={6} mt={7}>
                        <Box d='block'>
                            <Text fontWeight='bold' color='#676666' d='inline-block'>Add Ingredient</Text>
                            <CloseButton float='right' onClick={() => deleteIngredient(ing.id)} />
                        </Box>
                        <Box w='full' d='block' mt='5px'>
                            <Input type="text" variant='filled' w={{md: '27%', base: '100%'}} mr={4} placeholder='Unit' />  
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

            <Button  rightIcon={<ArrowForwardIcon />} mt={7} colorScheme="teal" variant="outline">
                    Next
            </Button>
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
    transition: .3s;

    &:hover {
        background: #9de2b93b;
        transition: .3s;
    }

`;