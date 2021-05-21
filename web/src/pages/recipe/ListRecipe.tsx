import React from 'react';
import { Box, Heading, Grid, GridItem, Text, Button } from '@chakra-ui/react';
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';


export const ListRecipe : React.FC = () => {


    const [loading, SetLoading] = React.useState<boolean>(false);
    const [recipes, SetRecipes] = React.useState<any []>();
    const [error, SetError] = React.useState('')

    React.useEffect(() => {
        SetLoading(true);
        axios.post(URLS.recipe.list).then(res => {
            const _data = res.data;
            SetLoading(false);
            if(_data.status === false){
                SetError(_data.message);
            }else if(_data.status === true){
                SetRecipes(_data.data);
            }
            
        });
    }, []);

    if(loading){
        return <>Loading</>
    }

    return(
        <Box mt={5}>
            <Heading>List Recipes</Heading>
            <Grid templateColumns="repeat(3, 1fr)" gap={0}>
                {
                    recipes?.map((recipe, key) => (
                        <GridItem key={key} colSpan={{md: 1, base: 3}}  >
                            <Box p={4} mt={4} mr={3}  bg='gray.100' rounded={6}>
                                    <Text fontSize={20} fontWeight='bold'>{recipe.title}</Text>
                                    <Text fontSize={12} opacity={.8}>{recipe.description}</Text>
                            </Box>    
                        </GridItem>
                    ))
                }
                <GridItem colSpan={{md: 1, base: 3}}  >
                    <Box p={4} mt={4} mr={3}  bg='gray.100' rounded={6}>
                            <Text fontSize={20} fontWeight='bold'>Recipe Title</Text>
                            <Text fontSize={12} opacity={.8}>short description</Text>
                    </Box>    
                </GridItem>
                <GridItem colSpan={{md: 1, base: 3}}  >
                    <Box p={4} mt={4} mr={3}  bg='gray.100' rounded={6}>
                            <Text fontSize={20} fontWeight='bold'>Recipe Title</Text>
                            <Text fontSize={12} opacity={.8}>short description</Text>
                    </Box>    
                </GridItem>
                <GridItem colSpan={{md: 1, base: 3}}  >
                    <Box p={4} mt={4} mr={3}  bg='gray.100' rounded={6}>
                            <Text fontSize={20} fontWeight='bold'>Recipe Title</Text>
                            <Text fontSize={12} opacity={.8}>short description</Text>
                    </Box>    
                </GridItem>
                <GridItem colSpan={{md: 1, base: 3}}  >
                    <Box p={4} mt={4} mr={3}  bg='gray.100' rounded={6}>
                            <Text fontSize={20} fontWeight='bold'>Recipe Title</Text>
                            <Text fontSize={12} opacity={.8}>short description</Text>
                    </Box>    
                </GridItem>

            
                
            </Grid>
        </Box>
    );
}