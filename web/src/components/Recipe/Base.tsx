import { ArrowForwardIcon } from '@chakra-ui/icons';
import { FormControl, FormLabel, Button, Switch, CheckboxProps } from '@chakra-ui/react';
import React from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { InputFonted } from '../Form/InputFonted';


interface Props {
    next: (key: string, _data: any) => void;
}

export const RecipeBase : React.FC<Props> = ({next}) => {

    const [error, SetError] = React.useState('');
    const [recipeInfo, SetRecipeInfo] = React.useState<any>({
        public: false
    });

    const handleRecipeInfo = (e: React.FormEvent<any>) => {
        console.log('current element id : ', e.currentTarget.id);
        SetRecipeInfo({
            ...recipeInfo,
            [e.currentTarget.id]: e.currentTarget.value
        })
    } 

    const handleNext = () => {
        if(!recipeInfo || !recipeInfo.title || !recipeInfo.tags){
            SetError('Recipe Base Information Are Missing !');
            return;
        }
        next("recipe", recipeInfo);
    } 

    const handleRecipeVisibility = (e: React.FormEvent<any>) => {
        SetRecipeInfo({
            ...recipeInfo,
            public: e.currentTarget.checked
        })
        console.log('recipe info => ', recipeInfo);
    }

    return(
        <>
            {
                error ? 
                <ErrorMessage message={error} /> : null
            }
            <form >
                <InputFonted type='text' placeholder='Give Your Recipe A Title' id='title' onChange={(e) => handleRecipeInfo(e)}  />
                <hr style={{marginTop: '12px'}} />
                <InputFonted type='textarea' placeholder='Short Description ?' id='description' onChange={(e) => handleRecipeInfo(e)} />
                <hr style={{marginTop: '12px'}} />
                <InputFonted type='textarea' placeholder='Some tags to identify your recipe exp: low carb | high protein ...' id='tags' onChange={(e) => handleRecipeInfo(e)} />
                <hr style={{marginTop: '12px'}} />
                <FormControl display="flex" alignItems="center" mt={6}>
                    <FormLabel  htmlFor="public-recipe" mb="0">
                        you want this recipe to be public to everyone ?
                    </FormLabel>
                    <Switch id="public-recipe" colorScheme='green' onChange={(e) => handleRecipeVisibility(e)} />
                </FormControl>
                <FormControl mt={6}>
                    <Button  rightIcon={<ArrowForwardIcon />} onClick={() => handleNext()} colorScheme="teal" variant="outline">
                        Next
                    </Button>
                </FormControl>
            </form>
        </>
    );

}