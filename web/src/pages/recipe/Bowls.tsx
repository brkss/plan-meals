import React from 'react';
import { Box, Heading, Grid, GridItem, Text, Button, Center, ButtonGroup, IconButton, useToast } from '@chakra-ui/react';
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';
import { AddIcon } from '@chakra-ui/icons';
import { RouteComponentProps } from 'react-router';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';


export const ListBowls : React.FC<RouteComponentProps> = ({history}) => {

    const [loading, Setloading] = React.useState(false);
    const [bowls, SetBowls] = React.useState<any []>();

    React.useEffect(() => {
        axios.get(URLS.bowl.bowls).then(res => {
            console.log('res => ', res);
            const _data = res.data;
            if(_data.status === true){
                console.log('coted => ', _data.data);
                SetBowls(_data.data);
            }
        });
    }, []);
    

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
            <Heading>My Bowls</Heading>
            <Grid templateColumns="repeat(3, 1fr)" gap={0}>
                {
                    bowls?.map((bowl, key) => (
                        <GridItem key={key} colSpan={{md: 1, base: 3}}  >
                            <Box p={4} mt={4} mr={3}  bg='gray.100' rounded={6} minH='140px' >
                                    <Text fontWeight='bold'>{bowl.title}</Text>
                                    <Text fontSize={11} minHeight={'44px'} opacity={.8}>{handleCropText(bowl.ticket)}</Text>
                                    <ButtonGroup size="sm" isAttached variant="outline" mt={2} borderColor='gray.900'>
                                        <Button bg='gray.200' mr="-px" leftIcon={<BsEye />} onClick={() => {
                                            history.push(`/dash/recipe/info/1`)
                                        }}>View</Button>
                                        <IconButton bg='gray.200' aria-label="Delete Recipe" icon={<BsTrash />} isLoading={true} onClick={() => {}} />
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