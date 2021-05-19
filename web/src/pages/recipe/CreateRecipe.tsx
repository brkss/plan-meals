import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { InputFonted } from '../../components/Form/InputFonted';
import { FormControl, FormLabel, Switch, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Ingredients } from '../../components/Recipe/Ingredients';


export const CreateRecipe : React.FC = () => {

    const [step, SetStep] = React.useState(1);
    const [error, SetError] = React.useState('');
    const [recipeInfo, SetRecipeInfo] = React.useState<any>();
    
    const handleRecipeInfo = (e: React.FormEvent<any>) => {
        console.log('current element id : ', e.currentTarget.id);
        SetRecipeInfo({
            ...recipeInfo,
            [e.currentTarget.id]: e.currentTarget.value
        })
    } 

    

    const handleNext = () => {
       //check recipe info data validity 
       if(!recipeInfo || !recipeInfo.title || !recipeInfo.tags){
            SetError('Recipe Base Information Are Missing !');
            return;
       }
       SetError('');
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
                {
                    error ? 
                    <ErrorMessage message={error} /> : null
                }
                {/* STEP 1 - RECIPE BASE INFO */}
                <form style={{display: step !== 1 ? 'none' : 'block'}}>

                    <InputFonted type='text' placeholder='Give Your Recipe A Title' id='title' onChange={(e) => handleRecipeInfo(e)} />
                    <hr style={{marginTop: '12px'}} />
                    <InputFonted type='textarea' placeholder='Short Description ?' id='description' onChange={(e) => handleRecipeInfo(e)} />
                    <hr style={{marginTop: '12px'}} />
                    <InputFonted type='textarea' placeholder='Some tags to identify your recipe exp: low carb | high protein ...' id='tags' onChange={(e) => handleRecipeInfo(e)} />
                    <hr style={{marginTop: '12px'}} />
                    <FormControl display="flex" alignItems="center" mt={6}>
                        <FormLabel  htmlFor="public-recipe" mb="0">
                            you want this recipe to be public to everyone ?
                        </FormLabel>
                        <Switch id="public-recipe" colorScheme='green' />
                    </FormControl>
                    <FormControl mt={6}>
                        <Button  rightIcon={<ArrowForwardIcon />} onClick={() => handleNext()} colorScheme="teal" variant="outline">
                            Next
                        </Button>
                    </FormControl>
                </form>

                {/* STEP 2 - INGREDIENTS */}
                <Box d={step !== 2 ? 'none' : 'block'}>
                    <Ingredients next={() => handleNext()} back={() => handleBack()} />
                </Box>
                
            </Box>

           
                

        </Box>
    
    );
}