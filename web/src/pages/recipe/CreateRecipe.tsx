import React from 'react';
import { Box, Input, Grid, GridItem, FormControl } from '@chakra-ui/react';
import { InputFonted } from '../../components/Form/InputFonted';

export const CreateRecipe : React.FC = () => {

    return(
        
        <Box mt={10}>
            
                <Box w={{md: '40%', base: '100%'}} m='auto' >
                    
                    <form >

                        <InputFonted type='text' placeholder='Give Your Recipe A Title' />

                    </form>
                </Box>

        </Box>
    
    );
}