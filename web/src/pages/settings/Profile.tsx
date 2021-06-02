import React from 'react';
import { Box, Button, Heading, FormControl, FormLabel, Input, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputStepper, Switch, Select, Grid, GridItem } from '@chakra-ui/react'; 
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';
import chillImage from '../../dist/happy-jump.svg';
import { InfoMessage } from '../../components/InfoMessage';
import { ErrorMessage } from '../../components/ErrorMessage';
import { RouteComponentProps } from 'react-router';
import { Password } from '../../components/Setting/Password';

export const ProfileSetting : React.FC<RouteComponentProps> = ({history}) => {

    const [loading, SetLoading] = React.useState(false);
    const [error, SetError] = React.useState('');
    const [categories, SetCategories] = React.useState<any[]>();
    const [form, SetForm] = React.useState<any>();

   

    

    return (
        <Box mt={10}>
            <Grid h="100vh" templateColumns="repeat(6, 1fr)" gap={0}>
                <GridItem colSpan={{md: 3, base: 6}} ml={7}  mr={7} >
                    <Heading>Settings</Heading>
                    <Box w={{md: '100%', base: '100%'} }>
                        <form>
                            {
                                error ? 
                                <ErrorMessage message={error} /> : null
                            }
                            <FormControl mt={6}>
                                    <FormLabel fontWeight='bold'>Name</FormLabel>
                                    <Input type="text" placeholder="Name" variant="filled" id='title'  />
                            </FormControl>
                            <FormControl mt={6}>
                                    <FormLabel fontWeight='bold'>Username</FormLabel>
                                    <Input type="text" placeholder="Username" variant="filled" id='title'  />
                            </FormControl>
                            <FormControl mt={6}>
                                    <FormLabel fontWeight='bold'>Email</FormLabel>
                                    <Input type="text" placeholder="Email" variant="filled" id='title'  />
                            </FormControl>
                           
                            <Button width="full" mt={4} type="submit" w={{md: '30%', base: '100%'}} colorScheme='green'  isLoading={false} loadingText="Adding">
                                Apply
                            </Button>
                            
                        </form>
                        <br />
                        <hr />
                        <br />
                        <Password /> 
                    </Box>
                </GridItem>
                
            </Grid>
            
            
        </Box>
    );
}