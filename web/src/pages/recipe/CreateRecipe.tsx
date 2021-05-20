import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { InputFonted } from '../../components/Form/InputFonted';
import { FormControl, FormLabel, Switch, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Ingredients } from '../../components/Recipe/Ingredients';
import { RecipeBase } from '../../components/Recipe/Base';

export const CreateRecipe : React.FC = () => {

    const [step, SetStep] = React.useState(1);
    const [data, SetData] = React.useState<any>({});

    

    

    const handleNext = (key: string, _data: any) => {
       //check recipe info data validity 
       SetData({
           ...data,
           [key]: _data
       })
       console.log('_data fron next => ', data);
       /* if(!recipeInfo || !recipeInfo.title || !recipeInfo.tags){
            SetError('Recipe Base Information Are Missing !');
            return;
       } */
       
       if(step < 2){
           SetStep(step+1);
       }

    }

    const handleBack = () => {
        console.log('back')
        if(step > 1){
            SetStep(step-1);
        }
    }

    return(
        
        <Box mt={10}>
            
            <Box w={{md: '40%', base: '100%'}} m='auto'  >
                <Heading></Heading>
                
                {/* STEP 1 - RECIPE BASE INFO */}
                <Box d={step !== 1 ? 'none' : 'block'}>
                <   RecipeBase />
                </Box>
                

                {/* STEP 2 - INGREDIENTS */}
                <Box d={step !== 2 ? 'none' : 'block'}>
                    <Ingredients next={(key, _data) => handleNext(key, _data)} back={() => handleBack()} />
                </Box>
                
            </Box>

           
                

        </Box>
    
    );
}