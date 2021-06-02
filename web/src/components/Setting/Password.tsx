import { Box, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import React from 'react';


export const Password : React.FC = () => {

    return (
        <Box   rounded={5}>
            <Text fontWeight='bold' fontSize='25px'>Change Password: </Text>
            <FormControl mt={6}>
                    <FormLabel fontWeight='bold'>Old Password</FormLabel>
                    <Input type="password" placeholder="old password" variant="filled" id='title'  />
            </FormControl>
            <FormControl mt={6}>
                    <FormLabel fontWeight='bold'>New Password</FormLabel>
                    <Input type="password" placeholder="new password" variant="filled" id='title'  />
            </FormControl>
            <FormControl mt={6}>
                    <FormLabel fontWeight='bold'>Repeat Password</FormLabel>
                    <Input type="password" placeholder="repeat password" variant="filled" id='title'  />
            </FormControl>
            <Button width="full" mt={4} type="submit" w={{md: '30%', base: '100%'}}  isLoading={false} colorScheme='green' loadingText="Adding">
                Change
            </Button>
        </Box>
    );

}