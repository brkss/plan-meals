import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { InputFonted } from '../../components/Form/InputFonted';
import { FormControl, FormLabel, Switch, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';


export const CreateRecipe : React.FC = () => {

    const [step, SetStep] = React.useState(1);

    return(
        
        <Box mt={10}>
            

            <Box w={{md: '40%', base: '100%'}} m='auto' d={step !== 1 ? 'none' : 'block'} >
                <Heading></Heading>
                <form >

                    <InputFonted type='text' placeholder='Give Your Recipe A Title' />
                    <InputFonted type='textarea' placeholder='Short Description ?' />
                    <InputFonted type='textarea' placeholder='Some tags to identify your recipe exp: low carb | high protein ...' />
                    <FormControl display="flex" alignItems="center" mt={6}>
                        <FormLabel  htmlFor="public-recipe" mb="0">
                            you want this recipe to be public to everyone ?
                        </FormLabel>
                        <Switch id="public-recipe" colorScheme='green' />
                    </FormControl>
                    <FormControl mt={6}>
                        <Button  rightIcon={<ArrowForwardIcon />} onClick={() => SetStep(2)} colorScheme="teal" variant="outline">
                            Next
                        </Button>
                    </FormControl>
                </form>
            </Box>

            <Button  rightIcon={<ArrowForwardIcon />} onClick={() => SetStep(1)} colorScheme="teal" variant="outline">
                            Next
                        </Button>
                

        </Box>
    
    );
}