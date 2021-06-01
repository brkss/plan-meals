import React from 'react';
import { Box, Button, Heading, FormControl, FormLabel, Input, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputStepper, Switch, Select, Grid, GridItem } from '@chakra-ui/react'; 
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';
import chillImage from '../../dist/happy-jump.svg';
import { InfoMessage } from '../../components/InfoMessage';
import { ErrorMessage } from '../../components/ErrorMessage';
import { RouteComponentProps } from 'react-router';

export const ProfileSetting : React.FC<RouteComponentProps> = ({history}) => {

    const [loading, SetLoading] = React.useState(false);
    const [error, SetError] = React.useState('');
    const [categories, SetCategories] = React.useState<any[]>();
    const [form, SetForm] = React.useState<any>();

   

    

    return (
        <Box mt={10}>
            <Grid h="100vh" templateColumns="repeat(6, 1fr)" gap={0}>
                <GridItem colSpan={{md: 3, base: 6}}  >
                    <InfoMessage message="Adding groceries help you manage your recipe ingredients better" />
                    <Heading>Settings</Heading>
                    <Box w={{md: '100%', base: '100%'} }>
                        <form>
                            {
                                error ? 
                                <ErrorMessage message={error} /> : null
                            }
                            <FormControl mt={6}>
                                    <FormLabel fontWeight='bold'>Name</FormLabel>
                                    <Input type="text" placeholder="Title" variant="filled" id='title'  />
                            </FormControl>
                            <FormControl mt={6}>
                                    <FormLabel fontWeight='bold'>Username</FormLabel>
                                    <Input type="text" placeholder="Title" variant="filled" id='title'  />
                            </FormControl>
                            <FormControl mt={6}>
                                    <FormLabel fontWeight='bold'>Email</FormLabel>
                                    <Input type="text" placeholder="Title" variant="filled" id='title'  />
                            </FormControl>
                            
                            <FormControl mt={6}>
                                    <FormLabel fontWeight='bold'>Price <span style={{fontSize: '12px', opacity:'.8'}}> - optional</span></FormLabel>
                                    <NumberInput variant="filled" >
                                        <NumberInputField placeholder="Price" id='price'  />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                            </FormControl>
                        
                            <FormControl display="flex" alignItems="center" mt={6}>
                                <FormLabel  htmlFor="email-alerts" mb="0">
                                    do you have this element in your fridge ?
                                </FormLabel>
                                <Switch id="email-alerts" />
                            </FormControl>
                            <Button width="full" mt={4} type="submit" w={{md: '30%', base: '100%'}}  isLoading={true} loadingText="Adding">
                                Create
                            </Button>
                            
                        </form>
                        <br />
                        <hr />
                        <Box border='1px solid #d8d8d8' mt={5} p={6} rounded={5}>
                            <FormControl mt={6}>
                                    <FormLabel fontWeight='bold'>Old Password</FormLabel>
                                    <Input type="password" placeholder="old password" variant="filled" id='title'  />
                            </FormControl>
                            <FormControl mt={6}>
                                    <FormLabel fontWeight='bold'>New Password</FormLabel>
                                    <Input type="password" placeholder="new password" variant="filled" id='title'  />
                            </FormControl>
                            <FormControl mt={6}>
                                    <FormLabel fontWeight='bold'>Repeat Password</FormLabel>
                                    <Input type="password" placeholder="repeat password" variant="filled" id='title'  />
                            </FormControl>
                        </Box>
                    </Box>
                </GridItem>
                <GridItem colSpan={{md: 3, base: 6}} ml={7} >
                            <img src={chillImage} alt=""  />
                </GridItem>
            </Grid>
            
            
        </Box>
    );
}