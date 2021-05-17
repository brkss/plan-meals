import { Box, Table, Thead, Tr, Th, Tbody, Td,  Heading, Switch } from '@chakra-ui/react';
import React from 'react';


export const ListGrocery : React.FC = () => {

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
                    <Tr >
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td isNumeric>25.4 Dhs</Td>
                        <Td>Yes <Switch float='right' isFocusable={true} size="sm" /></Td>
                    </Tr>
                    <Tr bg='gray.100' >
                        <Td>feet</Td>
                        <Td>centimetres (cm)</Td>
                        <Td isNumeric>25.4 Dhs</Td>
                        <Td>No <Switch float='right'  size="sm" /></Td>
                    </Tr>
                    <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td isNumeric>25.4 Dhs</Td>
                        <Td>Yes <Switch float='right'  size="sm" /></Td>
                    </Tr>
                    <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td isNumeric>25.4 Dhs</Td>
                        <Td>Maybe <Switch float='right'  size="sm" /></Td>
                    </Tr>
                    <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td isNumeric>25.4 Dhs</Td>
                        <Td>Yes <Switch size="sm" float='right' /></Td>
                    </Tr>
                </Tbody>
                
            </Table>
        </Box>
    )
}