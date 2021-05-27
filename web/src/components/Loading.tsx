import { Box, Center, Spinner } from '@chakra-ui/react';
import React from 'react';



export const Loading : React.FC = () => {

    return(
        <Box>
            <Center height='100vh' bg='white' zIndex={9999} >
                <Spinner />
            </Center>
        </Box>
    );

}