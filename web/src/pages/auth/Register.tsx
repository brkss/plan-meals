import React from 'react';
import { FormControl, FormLabel, Input, Button, useColorMode, Flex, Box, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { ErrorMessage } from '../../components/ErrorMessage';
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';
import { setAccessToken } from '../../helpers/auth/token';


export const RegisterPage : React.FC = () => {

    const {colorMode} = useColorMode();
    const [form, SetForm] = React.useState<any>();
    const [loading, SetLoading] = React.useState<boolean>(false);
    const [error, SetError] = React.useState<string>('');

    console.log(process.env.REACT_APP_API_URL);

    const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
        SetForm({
            ...form,
            [e.currentTarget.id] : e.currentTarget.value
        });
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!form || !form.name || !form.username || !form.email || !form.password){
            SetError('Please check your information !');
            return;
        }
        SetError('');
        const _data = {
            name: form.name,
            username: form.username,
            email: form.email,
            password: form.password
        }
        
        SetLoading(true);
        const resp = await axios.post(URLS.user.register, _data);
        console.log('resp => ', resp)
        SetLoading(false);
        const data = resp.data;
        if(data.status === false){
            SetError(data.message as string);
        }else if(data.status === true && data.accessToken){
            setAccessToken(data.accessToken);
        }
    }

    return(
        <Flex w='full' align='center' justifyContent='center'>
           <Box p={12} w='100%' maxW='475px' bg={colorMode === 'light' ? 'gray.50' : 'gray.900'} rounded={6}>
                <Box textAlign='center'> 
                    <Heading>Create Account</Heading>
                </Box>
                {error !== '' ? <ErrorMessage message={error as string} /> : null}
                <Box my={4} textAlign='left'>
                    <form onSubmit={(e) => handleRegister(e)} >
                        <FormControl mt={6}>
                            <FormLabel>Name</FormLabel>
                            <Input type="text" placeholder="Name" variant="filled" id='name' onChange={(e) => handleForm(e)} disabled={loading as boolean} />
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" placeholder="Username" variant="filled" id='username' onChange={(e) => handleForm(e)} disabled={loading as boolean} />
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" placeholder="example@example.com" variant="filled" id='email' onChange={(e) => handleForm(e)} disabled={loading as boolean} />
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="*******" variant="filled" id='password' onChange={(e) => handleForm(e)} disabled={loading as boolean} />
                        </FormControl>
                        <FormControl mt={6}>
                            <Link to="/auth/login" >Login to your account ? </Link>
                        </FormControl>
                        <Button width="full" mt={4} type="submit" loadingText="Sign In..." isLoading={loading as boolean}>
                            Sign In
                        </Button>
                    </form>
                </Box>
           </Box>
       </Flex> 
    );
}