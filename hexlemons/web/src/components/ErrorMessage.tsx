import { Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/react';
import React from 'react';

interface Props {
    message: string;
}

export const ErrorMessage : React.FC<Props> = ({message}) => {

    return(
        <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>{message}</AlertTitle>
        </Alert>
    );

}