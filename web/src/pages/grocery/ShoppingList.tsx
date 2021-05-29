import React from 'react';
import { Box, Grid, GridItem, Text, List, ListItem, ListIcon, Heading } from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/all';
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';

export const ShoppingList : React.FC = () => {

    const [shopList, SetShopList] = React.useState<any []>();
    const [loading, SetLoading] = React.useState(false);
    React.useEffect(() => {
        SetLoading(true);
        axios.post(URLS.grocery.shopList).then(res => {
            SetLoading(false);
            const _data = res.data;
            if(_data.status === true){
                SetShopList(_data.data);   
            }
            console.log('res =>', res);
        });

    }, []);

    
    /* const getShopList = () => {

        

    } */


    return(
        <>
            <Heading mt={7}>What you'll need in the next 3 days</Heading>
            <Grid  templateColumns="repeat(12, 1fr)" gap={0}>
                {
                    shopList?.map((day, key) => (
                        <GridItem colSpan={{lg: 6, md: 12, base: 12}} key={key} >
                            <Box bg='gray.100' p={4} m={4} rounded={6} ml={0}>
                                <Text mb={3} fontWeight='bold'> {day.name} </Text>
                                <List spacing={3}>
                                    {
                                        day?.grcoeries?.map((item: any, key: number) => (
                                            <ListItem key={key}>
                                                <ListIcon as={MdCheckCircle} color="green.500" />
                                                {item.title}
                                            </ListItem>
                                        ))
                                    }
                                    
                                    <ListItem>
                                        <ListIcon as={MdCheckCircle} color="green.500" />
                                        Assumenda, quia temporibus eveniet a libero incidunt suscipit
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={MdCheckCircle} color="green.500" />
                                        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                                    </ListItem>
                                    
                                </List>
                            </Box>
                        </GridItem>
                    ))
                }
                
            </Grid>
        </>
    )

}