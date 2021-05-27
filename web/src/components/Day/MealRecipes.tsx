import React from 'react'
import { Text, Drawer, Center, DrawerOverlay, Box, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Button, useToast } from '@chakra-ui/react';
import { CgBowl } from 'react-icons/all';
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';
import { Loading } from '../Loading';


interface Props {
    isOpen: boolean;
    onClose: () => void;
    meal_id: number;
    refresh_meals: () => void;
}

export const MealRecipes : React.FC<Props> = ({isOpen, onClose, meal_id, refresh_meals}) => {

    const toast = useToast();

    const [loading, SetLoading] = React.useState(false);
    const [recipes, SetRecipes] = React.useState<any []>();
    React.useEffect(() => {
        if(isOpen){
            getRecipes();
        }
        
    }, [isOpen]);

    //add recipe to meal 
    const addRecipeToMeal = async (recipe_id: number) => {
        const _data = {
            recipe_id: recipe_id,
            meal_id: meal_id
        }

        await axios.post(URLS.day.add_recipe_to_meal, _data).then(res => {
            const _data = res.data;
            if(_data.status === true){
                toast({
                    title: _data.message,
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
                refresh_meals();
                onClose();
            }else if(_data.status === false){
                toast({
                    title: _data.message,
                    status: "warning",
                    duration: 9000,
                    isClosable: true,
                })
            }
            console.log('add recipe to meal => ', res);
        });
    }

    // get recipes 
    const getRecipes = async () => {
        SetLoading(true);
        await axios.post(URLS.recipe.list).then(res => {
            SetLoading(false);
            const _data = res.data;
            if(_data.status === true){
                SetRecipes(_data.data);
            }
            console.log('get recipes response => ', res);
        });

    }


    return(

        <>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                size='lg'
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Recipes</DrawerHeader>

                <DrawerBody >
                    {
                        !loading ? 
                        <>
                            <Input variant='filled' placeholder='Search..' />
                            <Box>
                                {
                                    recipes?.map((recipe, key) => (
                                        <Box key={key} bg='gray.50' p={3} mt={3} cursor='pointer' rounded={6} onClick={async () => await addRecipeToMeal(recipe.id)}>
                                            <Text><CgBowl /></Text>
                                            <Text fontWeight='bold'>{recipe.title}</Text>
                                            <Text>{recipe.description}</Text>
                                        </Box>
                                    ))
                                }
                                
                            </Box>
                        </> : <Loading />
                    }
                    
                </DrawerBody>

                
                </DrawerContent>
            </Drawer>
        </>
    );
}