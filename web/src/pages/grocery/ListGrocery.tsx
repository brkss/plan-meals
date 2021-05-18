import React from 'react';
import { Box, Table, Thead, Tr, Th, Tbody, Td,  Heading, Switch } from '@chakra-ui/react';
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';


export const ListGrocery : React.FC = () => {

    const [loading, SetLoading] = React.useState(false);
    const [list, SetList] = React.useState<any []>();
    
    React.useEffect(() => {
        
        SetLoading(true);
        axios.post(URLS.grocery.list, {}).then(resp => {
            const data = resp.data;
            console.log('list => ', data);
            if(data.status === true){
                SetList(data.data);
            }
            SetLoading(false);
        });
        
    }, []);


    return(
        <Box mt={7}>
            <Heading>Your Groceries List</Heading>
            <Table mt={7} size="sm">
                <Thead>
                    <Tr>
                        <Th>Title</Th>
                        <Th>Category</Th>
                        <Th isNumeric>Price</Th>
                        <Th>Is it available?</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        list?.map((element, key) => (
                            <Tr key={key}>
                                <Td>{element.title}</Td>
                                <Td>{element.category.name}</Td>
                                <Td isNumeric>{element.price !== 0 ? element.price : 'unset' }</Td>
                                <Td>{element.available === true ? 'Yes' : 'Maybe'} <Switch float='right' isChecked={element.available} size="sm" /></Td>
                            </Tr>
                        ))
                    }
                    
                </Tbody>
                
            </Table>
        </Box>
    )
}