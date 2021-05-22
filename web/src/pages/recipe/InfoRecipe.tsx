import React from 'react'
import { RouteComponentProps } from 'react-router';
import {Box, Heading, Text, Grid, GridItem } from '@chakra-ui/react';
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';
import { ErrorMessage } from '../../components/ErrorMessage';

export const InfoRecipe : React.FC<RouteComponentProps<any>> = ({match, history}) => {

    const [loading, SetLoading] = React.useState(false);
    const [error, SetError] = React.useState<any>('');
    const [recipe, SetRecipe] = React.useState<any>();


    React.useEffect(() => {
        SetLoading(true);
        axios.post(URLS.recipe.info, {recipe_id: match.params.id}).then(resp => {
            SetLoading(false);
            const _data = resp.data;
            if(_data.status === false){
                if(_data.message.includes('not found')) history.push('/dash/recipe/list');
                else SetError(_data.message);
                return;
            }else if(_data.status === true){
                SetRecipe(_data.data[0]);
            }
            console.log('response => ', _data);
        });
    }, []);

    if(loading || !recipe) return <>Loading</>
    if(error) return <Box mt={7}> <ErrorMessage message={error} w={{md: '40%', base: '100%'}} /> </Box>

    return(
        <Box mt={7} w={{md: '50%', base: '100%'}} m='auto'>
            <Heading> {recipe.title} </Heading>
            <Text opacity={.8}>
                {recipe.description}
            </Text>

            <Box bg='blue.50' rounded={6} padding={4} mt={5}>
                <Heading fontSize='20px'> Ingredients </Heading>
                <Grid templateColumns="repeat(3, 1fr)" gap={0}>
                    {
                        recipe.ingredients.map((ing: any, key: any) => (
                            <GridItem colSpan={{md: 1, base: 3}}  >
                                <Text p={3} mt={4} mr={3} bg='blue.100' rounded={6}>
                                    <Text fontWeight='bold'>{ing.measurement}</Text>
                                    <Text>{ing.grocery.title}</Text>
                                </Text>
                            </GridItem>
                        )) 
                    }

                    
                </Grid>
            </Box>

        </Box>
    );
}