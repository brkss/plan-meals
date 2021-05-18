import { Alert, AlertIcon, AlertProps, ComponentWithAs } from '@chakra-ui/react';
import React from 'react';

interface Props {
    message: string,
}


export const InfoMessage : React.FC<Props> = ({message}) => {

    return(
        <Alert status="info" mb={4} rounded={6}  >
                <AlertIcon />
                {message}
                
        </Alert>
    )

}