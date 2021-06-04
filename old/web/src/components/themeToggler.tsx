import React from 'react';
import { useColorMode, Box, IconButton} from '@chakra-ui/react';
import {MoonIcon, SunIcon} from '@chakra-ui/icons';

export const ThemeToggler : React.FC = () => {

    const {colorMode, toggleColorMode} = useColorMode()
    return(
        <>
            {/* position='fixed' width='100%' zIndex='9999' */}
            <Box textAlign='right' bg='gray.200' py={0} pl={4} mb={15} >
                <IconButton
                size="lg"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={() => toggleColorMode()}
                variant="ghost"
                aria-label=""
                
            />
            </Box>
           
        </>
        
    );

}