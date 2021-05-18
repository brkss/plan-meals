import React from 'react';
import { Box, Button, Heading, FormControl, FormLabel, Input, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputStepper, Switch, Select, Alert, AlertIcon } from '@chakra-ui/react'; 
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';

export const CreateGrocery : React.FC = () => {

    const [loading, SetLoading] = React.useState(false);
    const [categories, SetCategories] = React.useState<any[]>();
    const [form, SetForm] = React.useState<any>();

    React.useEffect(() => {
        handleCategoriesGet();
    },[]);

    // get data from the form 
    const handleForm = (e: React.FormEvent<any>) => {
        SetForm({
            ...form,
            [e.currentTarget.id]: e.currentTarget.value
        });
    }

    // handle form switch 
    const handleFormSwitch = (e : React.ChangeEvent<any>) => {
        SetForm({
            public: e.target.checked
        })
    }

    // handle grovery element creation 
    const handleGroceryCreation = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('form => ', form);
    }

    const handleCategoriesGet = async () => {
        const response = await axios.post(URLS.grocery.categories, {});
        const _data = response.data;
        SetCategories(_data);
        console.log('grocery categories => ', _data);
    }

    return (
        <Box mt={10}>
            <Alert status="info" mt={4} mb={4} rounded={6} w={{md: '50%', base: '100%'} } >
                <AlertIcon />
                Adding groceries help you manage your recipe ingredients better
            </Alert>
            <Heading>Create Grocery Element</Heading>
            <Box w={{md: '50%', base: '100%'} }>
                <form>
                    <FormControl mt={6}>
                            <FormLabel fontWeight='bold'>Title</FormLabel>
                            <Input type="text" placeholder="Username" variant="filled" id='title' onChange={(e) => handleForm(e)}   />
                    </FormControl>
                    <FormControl mt={6}>
                            <FormLabel fontWeight='bold'>Price <span style={{fontSize: '12px', opacity:'.8'}}> - optional</span></FormLabel>
                            <NumberInput variant="filled" >
                                <NumberInputField placeholder="Price" id='price' onChange={(e) => handleForm(e)}  />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                    </FormControl>
                    
                    <FormControl mt={6}>
                        <FormLabel fontWeight='bold'>Category</FormLabel>
                        <Select variant='filled' isFullWidth={true} d='block' placeholder="Select Category" id='category' onChange={(e) => handleForm(e)} >
                            {
                                categories?.map((category, key) => (
                                    <option value={category.id}>{category.name}</option>
                                ))
                            }
                            
                        </Select>
                    </FormControl>
                    <FormControl display="flex" alignItems="center" mt={6}>
                        <FormLabel  htmlFor="email-alerts" mb="0">
                            do you have this element in your fridge ?
                        </FormLabel>
                        <Switch id="email-alerts"  onChange={(e) => handleFormSwitch(e)} />
                    </FormControl>
                    <Button width="full" mt={4} type="submit" w={{md: '30%', base: '100%'}} bg="#E5C9A5" isLoading={loading} loadingText="Adding" onClick={(e) => handleGroceryCreation(e)}>
                        Create
                    </Button>
                </form>
            </Box>
        </Box>
    );
}