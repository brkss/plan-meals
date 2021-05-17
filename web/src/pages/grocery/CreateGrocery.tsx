import React from 'react';
import { Box, Button, Heading, FormControl, FormLabel, Input, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputStepper, Switch, Select, Alert, AlertIcon } from '@chakra-ui/react'; 
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';

export const CreateGrocery : React.FC = () => {

    const [loading, SetLoading] = React.useState(false);
    const [categories, SetCategories] = React.useState<any[]>();

    React.useEffect(() => {
        handleCategoriesGet();
    },[]);

    const handleCategoriesGet = async () => {
        const response = await axios.post(URLS.grocery.categories, {});
        const _data = response.data;
        SetCategories(_data);
        console.log('grocery categories => ', _data);
    }

    return (
        <Box mt={10}>
            <Heading>Create Grocery Element</Heading>
            <Box w={{md: '50%', base: '100%'} }>
            <Alert status="info" mt={4} mb={4} rounded={6} >
                <AlertIcon />
                Adding groceries help you manage your recipe ingredients better
            </Alert>
                <form>
                    <FormControl mt={6}>
                            <FormLabel fontWeight='bold'>Title</FormLabel>
                            <Input type="text" placeholder="Username" variant="filled" id='username'  />
                    </FormControl>
                    <FormControl mt={6}>
                            <FormLabel fontWeight='bold'>Price <span style={{fontSize: '12px', opacity:'.8'}}> - optional</span></FormLabel>
                            <NumberInput variant="filled" >
                                <NumberInputField placeholder="Price" />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                    </FormControl>
                    
                    <FormControl mt={6}>
                        <FormLabel fontWeight='bold'>Category</FormLabel>
                        <Select variant='filled' isFullWidth={true} d='block' placeholder="Select Category">
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
                        <Switch id="email-alerts" />
                    </FormControl>
                    <Button width="full" mt={4} type="submit" w={{md: '30%', base: '100%'}} bg="#E5C9A5" isLoading={loading} loadingText="Adding">
                        Create
                    </Button>
                </form>
            </Box>
        </Box>
    );
}