import React from 'react'
import { useDisclosure, Text, Drawer, Center, DrawerOverlay, Box, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Button } from '@chakra-ui/react';
import { IDayDate } from '../../helpers/types/IDayDate';
import { AddIcon } from '@chakra-ui/icons';
import { MealRecipes } from './MealRecipes';
import { CgBowl } from 'react-icons/all';
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';


interface Props {
    isOpenMeal: boolean;
    onCloseMeal: () => void;
    day: IDayDate;
}

export const DayMeals : React.FC<Props> = ({isOpenMeal, onCloseMeal, day}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [mealId, SetMealId] = React.useState<number>();
    const [loading, SetLoading] = React.useState(false);
    const [meals, SetMeals] = React.useState<any []>([]);


    React.useEffect(() => {
        if(isOpenMeal){
            createDay();
        }
        console.log('create day')
        
    }, [isOpenMeal])

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
                SetMeals(data.meals);
            }
            SetLoading(false);
            console.log('create day resp => ', res);
        });
    }

    /* const [meals, SetMeals] = React.useState([
        {
            name: 'Breakfast'
        },
        {
            name: 'Lunch'
        },
        {
            name: 'Dinner'
        }
    ]) */


    


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

                <DrawerBody>
                    <>
                        {
                            loading ? 
                                <>loading..</>
                            : 
                            <>
                                <Text fontWeight='bold' fontSize='22px'> {day?.name}  {day?.date}, {day?.month} </Text>
                                {
                                    meals?.map((meal: any, key: number) =>(
                                            <Box key={key} p={3} background='gray.50' rounded={6} mt={5}>
                                                <Text fontWeight='bold'>{meal?.title}</Text>
                                                {
                                                    meal?.recipes?.map((recipe: any, key: any) => (
                                                        <Box p={3} bg='gray.100' rounded={6} mt={3} key={key}>
                                                            <Text fontWeight='bold' opacity={.8} > <CgBowl /> {recipe?.title} </Text>
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
                                <Box p={3} background='gray.50' cursor='pointer' rounded={6} mt={5} border='1px dotted #ababab'>
                                        <Center>
                                            <AddIcon />
                                        </Center>
                                </Box>
                            </>

                        }
                    </>
                   
                    

                </DrawerBody>

                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue">Save</Button>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}