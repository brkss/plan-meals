import React from 'react';
import { FormControl, FormLabel, Input, Button, useColorMode, Flex, Box, Heading} from '@chakra-ui/react';
import { Link, RouteComponentProps  } from 'react-router-dom'
import { ErrorMessage } from '../../components/ErrorMessage'
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';
import { setAccessToken } from '../../helpers/auth/token';



export const LoginPage : React.FC<RouteComponentProps> = ({history}) => {

    const {colorMode} = useColorMode()
    const [form, SetForm] = React.useState<any>();
    const [error, SetError] = React.useState('');
    const [loading, SetLoading] = React.useState(false);
    
    const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
        SetForm({
            ...form,
            [e.currentTarget.id]: e.currentTarget.value
        })
    } 

    const handleLogin = async (e : React.FormEvent) => {
        e.preventDefault();
        if(!form || !form.username || !form.password){
            SetError('Please check your information !');
            return;
        }
        SetError('');
        const _data = {
            username: form.username,
            password: form.password
        }
        
        SetLoading(true)
        const res = await axios.post(URLS.user.login, _data)
        SetLoading(false);
        const data = res.data;
        if(data.status === false){
            SetError(data.message);
        }else if(data.status === true && data.accessToken){
            setAccessToken(data.accessToken);
            history.push('/');

        }

    }

    return(
       <Flex w='full' align='center' justifyContent='center'>
           <Box p={12} w='100%' maxW='475px' bg={colorMode === 'light' ? 'gray.50' : 'gray.900'} rounded={6}>
                <Box textAlign='center'> 
                    <Heading>Login</Heading>
                </Box>
                {error !== '' ? <ErrorMessage message={error} /> : null}
                <Box my={4} textAlign='left'>
                    <form onSubmit={(e) => handleLogin(e)}>
                        <FormControl mt={6}>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" placeholder="Username" disabled={loading} variant="filled" id='username' onChange={(e) => handleForm(e)} />
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="*******" disabled={loading} variant="filled" id='password' onChange={(e) => handleForm(e)} />
                        </FormControl>
                        <FormControl mt={6}>
                            <Link to="/auth/register" >Create account ? </Link>
                        </FormControl>
                        <Button width="full" mt={4} type="submit" isLoading={loading} loadingText="Logging">
                            Sign In
                        </Button>
                    </form>
                </Box>
           </Box>
       </Flex> 
    );

}