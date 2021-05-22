import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { Ingredients } from '../../components/Recipe/Ingredients';
import { RecipeBase } from '../../components/Recipe/Base';
import { Directions } from '../../components/Recipe/Directions';
import { Urls } from '../../components/Recipe/Urls';
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';
import { ErrorMessage } from '../../components/ErrorMessage';
import { RouteComponentProps } from 'react-router';
import { Starter } from '../../components/Recipe/Starter';


export const CreateRecipe : React.FC<RouteComponentProps> = ({history}) => {

    const [loading, SetLoading] = React.useState(false);
    const [error, SetError] = React.useState('');
    const [step, SetStep] = React.useState(0);
    const [data, SetData] = React.useState<any>({});
    const steps = 4;

   

    //handle next action 
    const handleNext = async (key?: string, _data?: any) => {

        if(key && _data){
            SetData({
                ...data,
                [key]: _data
            }); 
        }
           
               
       if(step < steps){
           SetStep(step+1);
       }else if(step === steps && (key && _data)){
           let data_ = data;
           data_ = {
               ...data_,
               [key]: _data
           } 
           console.log('data_ => ', data_);
           await handleCreateRecipe(data_);
       }
    
    }

    // handle back action
    const handleBack = () => {
        console.log('back')
        if(step > 0){
            SetStep(step-1);
        }
    }

    // handle seting up data to create recipe  
    const handleCreateRecipe = async (_data: any) => {

        _data.ingredients = _data.ingredients.map((ing: any) => (
            {
                measurement: ing.unit,
                grocery_id: ing.grocery.value,
                calories: 0
            }
        ));
        
        SetLoading(true)
        axios.post(URLS.recipe.create, _data).then(res => {
            SetLoading(false)
            if(res.data.status === false){
                SetError(error);
            }else if(res.data.status === true) {
                history.push('/dash/grocery/list')
            }
            console.log('resp => ', res)
        });

    }

    return(
        
        <Box mt={10}>
            
            <Box w={{md: '40%', base: '100%'}} m='auto'  >
                <Heading></Heading>
                
                {
                    error ? 
                    <ErrorMessage message={error} /> : null
                }

                {/* STEP 0 - CHOOSE MODE URL OR MANUEL */}
                <Box d={step !== 0 ? 'none' : 'block'}>
                    <Starter next={() => handleNext()} />
                </Box>

                {/* STEP 1 - RECIPE BASE INFO */}
                <Box d={step !== 1 ? 'none' : 'block'}>
                    <RecipeBase next={(key, _data) => handleNext(key, _data)} back={() => handleBack()} />
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
                    <Urls next={(key, _data) => handleNext(key, _data)} back={() => handleBack()} loading={loading} />
                </Box>

                 
            </Box>

           
                

        </Box>
    
    );
}