import React from 'react'
import { RouteComponentProps } from 'react-router';
import {Box, Heading, Text, Grid, GridItem, Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react';
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';
import { ErrorMessage } from '../../components/ErrorMessage';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';

export const InfoRecipe : React.FC<RouteComponentProps<any>> = ({match, history}) => {

    const [loading, SetLoading] = React.useState(false);
    const [error, SetError] = React.useState<any>('');
    const [recipe, SetRecipe] = React.useState<any>();


    React.useEffect(() => {
        SetLoading(true);
        axios.post(URLS.recipe.info, {recipe_id: match.params.id}).then(resp => {
            const _data = resp.data;
            if(_data.status === false){
                if(_data.message.includes('not found')) history.push('/dash/recipe/list');
                else SetError(_data.message);
                return;
            }else if(_data.status === true){
                SetRecipe(_data.data[0]);
                SetLoading(false);
                console.log('recipe => ', recipe);
            }
            console.log('response => ', _data);
            
        });
    }, []);

    if(loading || !recipe) return <>Loading</>
    if(error) return <Box mt={7}> <ErrorMessage message={error} w={{md: '40%', base: '100%'}} /> </Box>

    console.log('recipe 999 => ', recipe);
    return(
        <Box w={{md: '50%', base: '100%'}} m='auto' pt={10}>
            <Heading> {recipe?.title} </Heading>
            <Text opacity={.8} mt={5}>
                {recipe?.description}
            </Text>

            <Box mt={7}>
                <Accordion allowMultiple defaultIndex={[0]}>
                    <AccordionItem border='1px solid #b1afaf' mt={5}>
                        {({ isExpanded }) => (
                        <>
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left" fontWeight='bold'>
                                    Ingredients
                                </Box>
                                {isExpanded ? (
                                <MinusIcon fontSize="12px" />
                                ) : (
                                <AddIcon fontSize="12px" />
                                )}
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Grid templateColumns="repeat(2, 1fr)" gap={0} >
                                    {
                                        recipe.ingredients?.map((ing: any, key: any) => (
                                            <GridItem colSpan={{md: 6, base: 2}} key={key}  >
                                                <Text p={3} mt={4} mr={3} bg='gray.100' rounded={6}>
                                                    {
                                                        ing.grocery ? 
                                                        <>
                                                            <Text fontWeight='bold'>{ing?.measurement}</Text>
                                                            <Text>{ing?.grocery.title}</Text>
                                                        </> : <Text fontWeight='bold'>{ing.name}</Text>
                                                    }
                                                
                                                </Text>
                                            </GridItem>
                                        )) 
                                    }

                                    
                                </Grid>
                            </AccordionPanel>
                        </>
                        )}
                    </AccordionItem>
                    <AccordionItem border='1px solid #b1afaf' mt={5}>
                        {({ isExpanded }) => (
                        <>
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left" fontWeight='bold'>
                                    Instructions
                                </Box>
                                {isExpanded ? (
                                <MinusIcon fontSize="12px" />
                                ) : (
                                <AddIcon fontSize="12px" />
                                )}
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Grid templateColumns="repeat(2, 1fr)" gap={0} >
                                    {
                                        recipe.directions?.map((dir: any, key: any) => (
                                            <GridItem key={key} colSpan={{md: 6, base: 2}}  >
                                                <Text p={3} mt={4} mr={3} bg='gray.100' rounded={6}>
                                                    <Text fontWeight='bold'>{dir.text}</Text>                                                
                                                </Text>
                                            </GridItem>
                                        )) 
                                    }

                                    
                                </Grid>
                            </AccordionPanel>
                        </>
                        )}
                    </AccordionItem>
                </Accordion>
            </Box>

            

        </Box>
    );
}