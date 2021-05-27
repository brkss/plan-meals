import React from 'react'
import { useDisclosure, Text, Drawer, Center, DrawerOverlay, Box, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, InputGroup, Button, CloseButton, useToast } from '@chakra-ui/react';
import { IDayDate } from '../../helpers/types/IDayDate';
import { AddIcon } from '@chakra-ui/icons';
import { MealRecipes } from './MealRecipes';
import { CgBowl } from 'react-icons/all';
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';
import { Loading } from '../Loading';


interface Props {
    isOpenMeal: boolean;
    onCloseMeal: () => void;
    day: IDayDate;
}

export const DayMeals : React.FC<Props> = ({isOpenMeal, onCloseMeal, day}) => {

    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [mealId, SetMealId] = React.useState<number>();
    const [loading, SetLoading] = React.useState(false);
    const [isAddingMeal, SetIsAddingMeal] = React.useState(false);
    const [meals, SetMeals] = React.useState<any []>([]);
    const [dayId, SetDayId] = React.useState<number>();
    const [title, SetTitle] = React.useState<string>();

    React.useEffect(() => {
        if(isOpenMeal){
            createDay();
        }
        console.log('create day')
        
    }, [isOpenMeal]);


    // handle title change 
    const handleMealTitle = (e: React.FormEvent<HTMLInputElement>) => {
        SetTitle(e.currentTarget.value);
    }

    const createDay = () => {
        const ref = `${day?.date}${day?.month.toUpperCase()}${day?.year}`;
        const _data = {
            date: ref,
            title: `${day?.date} ,${day?.month}`
        }
        SetLoading(true);
        axios.post(URLS.day.create, _data).then(res => {
            const data = res.data;
            if(res.data.status === true){
                SetDayId(data.id);
                SetMeals(data.meals);
            }
            SetLoading(false);
            console.log('create day resp => ', res);
        });
    }

    const deleteMeal = (meal_id: number) => {

        axios.post(URLS.day.delete_meal, {id: meal_id}).then(res => {
            const _data = res.data;
            if(_data.status === true){
                toast({
                    title: _data.message,
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
                createDay()
            }else if(_data.status === false){
                toast({
                    title: _data.message,
                    status: "warning",
                    duration: 9000,
                    isClosable: true,
                });
            }
            console.log('delete meal response => ', res);
        })
    }

    // create meal 
    const CreateMeal = () => {
        const data = {
            day_id: dayId,
            title: title
        }
        if(!data.day_id || !data.title){
            toast({
                title: `Invalid information!`,
                status: "warning",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        axios.post(URLS.day.create_meal, data).then(resp => {
            console.log('create meal resp => ', resp);
            const _data = resp.data;
            if(_data.status === true){
                toast({
                    title: _data.message,
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
                createDay();
                SetIsAddingMeal(false);
            }else if(_data.status === false){
                toast({
                    title: _data.message,
                    status: "warning",
                    duration: 9000,
                    isClosable: true,
                });
            }
        })

    }

    // delete recipe from meal
    const deleteRecipeFromMeal = (meal_id: number, recipe_id: number) => {
        if(!meal_id || !recipe_id){
            toast({
                title: `Invalid information!`,
                status: "warning",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        const _data = {
            meal_id: meal_id,
            recipe_id: recipe_id
        }
        axios.post(URLS.day.delete_recipe_from_meal, _data).then(res => {
            console.log('remove recipe from meal => ', res);
            const _data = res.data;
            if(_data.status === true){
                toast({
                    title: _data.message,
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
                const mealIndex = meals.findIndex(x => x.id === meal_id) ;
                const recipeIndex = meals[mealIndex].recipes.findIndex((x: any) => x.id === recipe_id);
                meals[mealIndex].recipes.splice(recipeIndex, 1);
                SetMeals([...meals]);
            }else if(_data.status === false){
                toast({
                    title: _data.message,
                    status: "warning",
                    duration: 9000,
                    isClosable: true,
                });
            }
        })
    }


    

    return(

        <>
            <MealRecipes meal_id={mealId!} isOpen={isOpen} onClose={onClose} refresh_meals={() => createDay()} />
            <Drawer
                isOpen={isOpenMeal}
                placement="right"
                onClose={onCloseMeal}
                size='xl'
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Meals</DrawerHeader>

                <DrawerBody p6b={35}>
                    <>
                        {
                            loading ? 
                                <Loading />
                            : 
                            <>
                                <Text fontWeight='bold' fontSize='22px'> {day?.name}  {day?.date}, {day?.month} </Text>
                                {
                                    meals?.map((meal: any, key: number) =>(
                                            <Box key={key} p={3} background='gray.50' rounded={6} mt={5}>
                                                
                                                <Text fontWeight='bold'>{meal?.title} <CloseButton float='right' onClick={() => deleteMeal(meal.id)} /></Text>
                                                {
                                                    meal?.recipes?.map((recipe: any, key: any) => (
                                                        <Box p={3} bg='gray.100' rounded={6} mt={3} key={key}>
                                                            
                                                            <Text fontWeight='bold' opacity={.8} > 
                                                                <CgBowl />
                                                                {recipe?.title}
                                                                <CloseButton float='right' mt={-25} onClick={() => deleteRecipeFromMeal(meal.id, recipe.id)} />
                                                            </Text>
                                                        </Box>
                                                    ))
                                                }
                                                
                                                
                                                <Box p={3} bg='gray.100' rounded={6} mt={3} border='1px dotted #ababab' cursor='pointer' 
                                                    onClick={() => {
                                                        SetMealId(meal.id)
                                                        onOpen();
                                                    }}
                                                >
                                                    <Center>
                                                        <AddIcon />
                                                    </Center>
                                                </Box>
                                            </Box>
                                    ))
                                }
                                {
                                    isAddingMeal ? 
                                    <Box p={3} background='gray.50' cursor='pointer' rounded={6} mt={5}  >
                                           
                                            <Center>
                                               <InputGroup>
                                                    <Input variant='filled' placeholder='Meal Title' type='text' onChange={(e) => handleMealTitle(e)} />
                                                    <Button colorScheme='green' variant='outline' ml={3} onClick={() => CreateMeal()}>Add</Button>
                                                    <CloseButton float='right' onClick={() => SetIsAddingMeal(false)} ml={3} mt={1} />
                                                </InputGroup>
                                            </Center>
                                    </Box> : null 
                                }
                                
                                <Box p={3} background='gray.50' cursor='pointer' rounded={6} mt={5} border='1px dotted #ababab' onClick={() => SetIsAddingMeal(true)}>
                                        <Center>
                                            <AddIcon />
                                        </Center>
                                </Box>
                            </>

                        }
                    </>
                
                </DrawerBody>

                </DrawerContent>
            </Drawer>
        </>
    );
}