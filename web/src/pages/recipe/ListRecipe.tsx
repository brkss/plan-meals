import React from 'react';
import { Box, Heading, Grid, GridItem, Text, Button, Center, ButtonGroup, IconButton, useToast } from '@chakra-ui/react';
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';
import { AddIcon } from '@chakra-ui/icons';
import { RouteComponentProps } from 'react-router';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';


export const ListRecipe : React.FC<RouteComponentProps> = ({history}) => {


    const [loading, SetLoading] = React.useState<boolean>(false);
    const [loadingDelete, SetloadingDelete] = React.useState<number>(-1);
    const [recipes, SetRecipes] = React.useState<any []>();
    const [error, SetError] = React.useState('')
    const toast = useToast()

    React.useEffect(() => {
        handleGetRecipes();
    }, []);

    // get user's recipes 
    const handleGetRecipes = () => {
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
    }

    // deleting recipe 
    const  handleDeletingRecipe = async (id: number) => {
        SetloadingDelete(id);
        const resp = await axios.post(URLS.recipe.delete, {recipe_id: id});
        SetloadingDelete(-1);
        const _data = resp.data;
        if(_data.status === false){
            toast({
                title: _data.message,
                status: "warning",
                duration: 9000,
                isClosable: true,
            })
        }else if(_data.status === true){
            toast({
                title: _data.message,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            handleGetRecipes();
        }
    } 

    // crop text 
    const handleCropText = (text: string) => {
        return text.length > 127 ? 
            `${text.substring(0, 127)}...`:
            text;
        
    }

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
                            <Box p={4} mt={4} mr={3}  bg='gray.100' rounded={6} minH='140px' >
                                    <Text fontWeight='bold'>{recipe.title}</Text>
                                    <Text fontSize={11} minHeight={'44px'} opacity={.8}>{handleCropText(recipe.description)}</Text>
                                    <ButtonGroup size="sm" isAttached variant="outline" mt={2} borderColor='gray.900'>
                                        <Button bg='gray.200' mr="-px" leftIcon={<BsEye />} onClick={() => {
                                            history.push(`/dash/recipe/info/${recipe.id}`)
                                        }}>View</Button>
                                        <IconButton bg='gray.200' aria-label="Delete Recipe" icon={<BsTrash />} isLoading={loadingDelete === recipe.id} onClick={() => handleDeletingRecipe(recipe.id)} />
                                        <IconButton bg='gray.200' aria-label="Edit Recipe" icon={<BsPencil />} />
                                    </ButtonGroup> 
                            </Box>    
                        </GridItem>
                    ))
                }
                
                <GridItem colSpan={{md: 1, base: 3}}  >
                    <Center p={4} mt={4} mr={3}  bg='gray.100' rounded={6} minH='140px' cursor='pointer' onClick={() => {
                        history.push(`/dash/recipe/create`)
                    }}>
                            <Text fontSize={20} fontWeight='bold'><AddIcon /></Text>
                    </Center>    
                </GridItem>

            
                
            </Grid>
        </Box>
    );
}