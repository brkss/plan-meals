import React from 'react';
import { Box, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

interface Props {
    message: string;
    w?: any;
}

export const ErrorMessage : React.FC<Props> = ({message, w}) => {

    return(
        <Box my={4}  w={w}>
            <Alert status="error" borderRadius={4}>
                <AlertIcon />
                <AlertDescription>{message}</AlertDescription>
            </Alert>
        </Box>
    );

}