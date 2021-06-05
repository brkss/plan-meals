import React from 'react';
import { Box, Center, Tooltip } from '@chakra-ui/react';
import * as ReactIcon from 'react-icons/all';
import { useHistory } from 'react-router';


export const Navigation : React.FC = () => {

    const history = useHistory();
    const redir = (path: string) => {
        history.push(path);
    }

    return(
        <>
            <Box position={{md: 'fixed', base: 'initial'}} >

                <Tooltip label="Home" placement="right">
                    <Center onClick={_ => redir('/dash/grocery')} w="40px" h="40px" bg='#429789' p={2} rounded={6} m='auto'  mb={3} mt={3} cursor='pointer' _hover={{bg: '#4cb1a0'}} transition='.3s'>
                        <ReactIcon.BiHomeAlt  style={{fontSize: '25px'}} />
                    </Center>
                </Tooltip>

                <Tooltip label="Bowls" placement="right">
                    <Center onClick={_ => redir('/dash/recipe')}  w="40px" h="40px" bg='#429789' p={2} rounded={6} m='auto' mb={3} color='#053029' cursor='pointer' _hover={{bg: '#4cb1a0'}} transition='.3s'>
                        <ReactIcon.CgBowl style={{fontSize: '25px'}} />
                    </Center>
                </Tooltip>
                
                <Tooltip label="Recipes" placement="right">
                    <Center onClick={_ => redir('/dash/recipe')}  w="40px" h="40px" bg='#429789' p={2} rounded={6} m='auto' mb={3} color='#053029' cursor='pointer' _hover={{bg: '#4cb1a0'}} transition='.3s'>
                        <ReactIcon.BiDish style={{fontSize: '25px'}} />
                    </Center>
                </Tooltip>

                <Tooltip label="Days & Meals" placement="right">
                    <Center onClick={_ => redir('/dash/day')} w="40px" h="40px" bg='#429789' p={2} rounded={6} m='auto' mb={3} color='#053029' cursor='pointer' _hover={{bg: '#4cb1a0'}} transition='.3s'>
                        <ReactIcon.BiCalendar style={{fontSize: '25px'}} />
                    </Center>
                </Tooltip>

                <Tooltip label="Settings" placement="right">
                    <Center onClick={_ => redir('/dash/settings')} w="40px" h="40px" bg='#429789' p={2} rounded={6} m='auto' mb={3} color='#053029' cursor='pointer' _hover={{bg: '#4cb1a0'}} transition='.3s'>
                        <ReactIcon.BiCog style={{fontSize: '25px'}} />
                    </Center>
                </Tooltip>

                </Box>
        </>
    )
}