import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { Ingredients } from '../../components/Recipe/Ingredients';
import { RecipeBase } from '../../components/Recipe/Base';
import { Directions } from '../../components/Recipe/Directions';
import { Urls } from '../../components/Recipe/Urls';

export const CreateRecipe : React.FC = () => {

    const [step, SetStep] = React.useState(1);
    const [data, SetData] = React.useState<any>({});
    const steps = 4;


    //handle next action 
    const handleNext = async (key: string, _data: any) => {
       SetData({
           ...data,
           [key]: _data
       });
       
       if(step < steps){
           SetStep(step+1);
       }else {
           handleCreateRecipe()
       }
       console.log('current data => ', data);

    }

    // handle back action
    const handleBack = () => {
        console.log('back')
        if(step > 1){
            SetStep(step-1);
        }
    }

    // handle seting up data to create recipe  
    const handleCreateRecipe = () => {
        console.log('create recipe and this is the data before mapping => ', data);
        // map ingredients 
        data.ingredients = data.ingredients.map((ing: any) => (
            {
                measurement: ing.unit,
                grocery_id: ing.grocery.value,
                calories: 0
            }
        ));
        console.log('create recipe and this is the data after mapping => ', data);

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
                    <Directions next={(key, _data) => handleNext(key, _data)} back={() => handleBack()} />
                </Box>

                {/* STEP 4 - URLS */}
                <Box d={step !== 4 ? 'none' : 'block'}>
                    <Urls next={(key, _data) => handleNext(key, _data)} back={() => handleBack()} />
                </Box>
                
                
            </Box>

           
                

        </Box>
    
    );
}