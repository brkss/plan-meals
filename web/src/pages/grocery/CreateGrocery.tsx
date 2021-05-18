import React from 'react';
import { Box, Button, Heading, FormControl, FormLabel, Input, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputStepper, Switch, Select, Grid, GridItem } from '@chakra-ui/react'; 
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';
import chillImage from '../../dist/happy-jump.svg';
import { InfoMessage } from '../../components/InfoMessage';
import { ErrorMessage } from '../../components/ErrorMessage';
import { RouteComponentProps } from 'react-router';

export const CreateGrocery : React.FC = () => {

    const [loading, SetLoading] = React.useState(false);
    const [error, SetError] = React.useState('');
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
            ...form,
            public: e.target.checked
        })
    }

    // handle grovery element creation 
    const handleGroceryCreation = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('form => ', form);
        if(!form || !form.title || !form.category){
            SetError('Invalid data, please double check inserted informations');
            return;
        }
        const _data = {
            title: form.title,
            price: form.price ? form.price : 0,
            available: form.public ? form.public : false,
            category_id: form.category  
        }
        console.log('_data => ', _data);

        SetError('');
        SetLoading(true);
        const resp = await axios.post(URLS.grocery.create, _data);
        SetLoading(false);
        const data = resp.data;
        console.log('data => ', data);
        if(data.status === false){
            SetError(data.message);
        }
    }

    const handleCategoriesGet = async () => {
        const response = await axios.post(URLS.grocery.categories, {});
        const _data = response.data;
        SetCategories(_data);
        console.log('grocery categories => ', _data);
    }

    return (
        <Box mt={10}>
            <Grid h="100vh" templateColumns="repeat(6, 1fr)" gap={0}>
                <GridItem colSpan={{md: 3, base: 6}}  >
                    <InfoMessage message="Adding groceries help you manage your recipe ingredients better" />
                    <Heading>Create Grocery Element</Heading>
                    <Box w={{md: '100%', base: '100%'} }>
                        <form>
                            {
                                error ? 
                                <ErrorMessage message={error} /> : null
                            }
                            <FormControl mt={6}>
                                    <FormLabel fontWeight='bold'>Title</FormLabel>
                                    <Input type="text" placeholder="Title" variant="filled" id='title' onChange={(e) => handleForm(e)} disabled={loading}  />
                            </FormControl>
                            <FormControl mt={6}>
                                    <FormLabel fontWeight='bold'>Price <span style={{fontSize: '12px', opacity:'.8'}}> - optional</span></FormLabel>
                                    <NumberInput variant="filled" >
                                        <NumberInputField placeholder="Price" id='price' onChange={(e) => handleForm(e)} disabled={loading} />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                            </FormControl>
                            
                            <FormControl mt={6}>
                                <FormLabel fontWeight='bold'>Category</FormLabel>
                                <Select variant='filled' isFullWidth={true} d='block' placeholder="Select Category" id='category' onChange={(e) => handleForm(e)} disabled={loading} >
                                    {
                                        categories?.map((category, key) => (
                                            <option value={category.id} key={key}>{category.name}</option>
                                        ))
                                    }
                                    
                                </Select>
                            </FormControl>
                            <FormControl display="flex" alignItems="center" mt={6}>
                                <FormLabel  htmlFor="email-alerts" mb="0">
                                    do you have this element in your fridge ?
                                </FormLabel>
                                <Switch id="email-alerts"  onChange={(e) => handleFormSwitch(e)} disabled={loading} />
                            </FormControl>
                            <Button width="full" mt={4} type="submit" w={{md: '30%', base: '100%'}}  isLoading={loading} loadingText="Adding" onClick={(e) => handleGroceryCreation(e)}>
                                Create
                            </Button>
                        </form>
                    </Box>
                </GridItem>
                <GridItem colSpan={{md: 3, base: 6}} ml={7} >
                            <img src={chillImage} alt=""  />
                </GridItem>
            </Grid>
            
            
        </Box>
    );
}