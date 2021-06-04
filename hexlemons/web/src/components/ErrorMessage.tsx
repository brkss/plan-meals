import { Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/react';
import React from 'react';

interface Props {
    message: string;
}

export const ErrorMessage : React.FC<Props> = ({message}) => {

    return(
        <Alert mt={4} rounded={6} status="error">
            <AlertIcon />
            <AlertTitle mr={2}>{message}</AlertTitle>
        </Alert>
    );

}