import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { InputFonted } from '../../components/Form/InputFonted';
import { FormControl, FormLabel, Switch, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Ingredients } from '../../components/Recipe/Ingredients';
import { RecipeBase } from '../../components/Recipe/Base';
import { Directions } from '../../components/Recipe/Directions';


export const CreateRecipe : React.FC = () => {

    const [step, SetStep] = React.useState(3);
    const [data, SetData] = React.useState<any>({});



    const handleNext = async (key: string, _data: any) => {
       //check recipe info data validity 
       console.log('key => ', key);
       console.log('_data => ', _data);
       SetData({
           ...data,
           [key]: _data
       });
       
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
                    <RecipeBase next={(key, _data) => handleNext(key, _data) } />
                </Box>
                

                {/* STEP 2 - INGREDIENTS */}
                <Box d={step !== 2 ? 'none' : 'block'}>
                    <Ingredients next={(key, _data) => handleNext(key, _data)} back={() => handleBack()} />
                </Box>

                {/* STEpP 3 - DIRECTIONS */}
                <Box d={step !== 3 ? 'none' : 'block'}>
                    <Directions />
                </Box>
                
            </Box>

           
                

        </Box>
    
    );
}