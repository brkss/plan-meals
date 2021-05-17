import React from 'react';
import { Box, Button, Heading, FormControl, FormLabel, Input, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputStepper, Switch } from '@chakra-ui/react'; 

export const CreateGrocery : React.FC = () => {

    const [loading, SetLoading] = React.useState(false);

    return (
        <Box mt={10}>
            <Heading>Create Grocery Element</Heading>
            <Box w={{md: '50%', base: '100%'} }>
                <form>
                    <FormControl mt={6}>
                            <FormLabel>Title</FormLabel>
                            <Input type="text" placeholder="Username" variant="filled" id='username'  />
                    </FormControl>
                    <FormControl mt={6}>
                            <FormLabel>Price (optional)</FormLabel>
                            <NumberInput variant="filled" >
                                <NumberInputField placeholder="Price" />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                    </FormControl>
                    <FormControl display="flex" alignItems="center" mt={6}>
                        <FormLabel htmlFor="email-alerts" mb="0">
                            do you have this element in your fridge ?
                        </FormLabel>
                        <Switch id="email-alerts" />
                    </FormControl>
                    <Button width="full" mt={4} type="submit" w={{md: '30%', base: '100%'}} bg="#E5C9A5" isLoading={loading} loadingText="Logging">
                        Create
                    </Button>
                </form>
            </Box>
        </Box>
    );
}