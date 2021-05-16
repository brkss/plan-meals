import React from 'react';
import { useColorMode, Box, IconButton} from '@chakra-ui/react';
import {MoonIcon, SunIcon} from '@chakra-ui/icons';

export const ThemeToggler : React.FC = () => {

    const {colorMode, toggleColorMode} = useColorMode()
    return(
        <Box textAlign='right' py={4} mr={4}>
            <IconButton
            size="lg"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={() => toggleColorMode()}
            variant="ghost"
            aria-label=""
            
        />
        </Box>
    );

}