import React from 'react';
import { Box, Center, Tooltip } from '@chakra-ui/react';
import * as ReactIcon from 'react-icons/all';
import { useHistory } from 'react-router';

export const DashNav : React.FC = () => {
    
    const history = useHistory();
    const redir = (path: string) => {
        history.push(path);
    }

    return(
        <Box bg='gray.50' ml={3} mr={2} rounded={6} p={3} >

            <Tooltip label="Grocery" placement="right">
                <Center onClick={_ => redir('/dash/grocery')} w="40px" h="40px" bg='gray.100' p={2} rounded={6} m='auto' mb={3} mt={3} cursor='pointer' _hover={{bg: 'gray.200'}} transition='.3s'>
                    <ReactIcon.BiBasket style={{fontSize: '25px'}} />
                </Center>
            </Tooltip>

            <Tooltip label="Recipes" placement="right">
                <Center onClick={_ => redir('/dash/recipe')}  w="40px" h="40px" bg='gray.100' p={2} rounded={6} m='auto' mb={3} cursor='pointer' _hover={{bg: 'gray.200'}} transition='.3s'>
                    <ReactIcon.BiListCheck style={{fontSize: '25px'}} />
                </Center>
            </Tooltip>

            <Tooltip label="Days & Meals" placement="right">
                <Center onClick={_ => redir('/dash/days')} w="40px" h="40px" bg='gray.100' p={2} rounded={6} m='auto' mb={3} cursor='pointer' _hover={{bg: 'gray.200'}} transition='.3s'>
                    <ReactIcon.BiCalendar style={{fontSize: '25px'}} />
                </Center>
            </Tooltip>
            
            <Tooltip label="Settings" placement="right">
                <Center onClick={_ => redir('/dash/settings')} w="40px" h="40px" bg='gray.100' p={2} rounded={6} m='auto' mb={3} cursor='pointer' _hover={{bg: 'gray.200'}} transition='.3s'>
                    <ReactIcon.BiCog style={{fontSize: '25px'}} />
                </Center>
            </Tooltip>
            
        </Box>
    );
}
 