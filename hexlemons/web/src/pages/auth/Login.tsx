import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
import { InputRegular } from '../../components/Form/InputRegular';
import { ButtonRegular } from '../../components/Form/ButtonRegular';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useLoginMutation } from '../../generated/graphql';
import { getAccessToken, SetAccessToken } from '../../helpers/constants/token';
import { DEFAULT_REDIR_AUTH } from '../../helpers/constants/defaults';

export const LoginPage : React.FC<RouteComponentProps> = ({history}) => {

  const [loading, SetLoading] = React.useState(false);
  const [error, SetError] = React.useState('');
  const [form, SetForm] = React.useState<any>();
  const [login] = useLoginMutation();

  // handle form data
  const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
      // 
      SetForm({
        ...form,
        [e.currentTarget.id]: e.currentTarget.value
      });
  }

  if(getAccessToken() !== ''){
    history.push(DEFAULT_REDIR_AUTH);
  }

  //handle user login
  const handleUserLogin = async () => {
    // validate 
    if(!form || !form.identifier || !form.password){
      SetError('Invalid data!');
      return;
    }
    SetError('');
    const _data = {
      identifier: form.identifier,
      password: form.password
    }
    SetLoading(true);
    const resp = await login({
      variables: {
        identifier: _data.identifier,
        password: _data.password
      }
    });
    console.log('login response => ', resp);
    SetLoading(false);
    if(resp.data?.login.status === true){
      console.log('registered successfuly');
      SetAccessToken(resp.data.login.accessToken!);
      history.push('/');
    }else if(resp.data?.login.status === false){
      console.log("error status is false")
      SetError(resp.data!.login.message!);
    }


  }



  return(
    <>
      <Grid templateColumns="repeat(12, 1fr)" height='100vh' >
          <GridItem colSpan={1} bg="#ACCDC5" borderRight='1px solid black'>
            
          </GridItem>
          <GridItem colSpan={11} bg="#F4F3E7" >
          <Flex w='full' align='center' justifyContent='center'>
                <Box p={12} w='100%' maxW='475px' rounded={6}>
                      <Box textAlign='left'> 
                          <Heading>Login.</Heading>
                      </Box>
                      {error !== '' ? <ErrorMessage message={error} /> : null}
                      <Box my={4} textAlign='left'>
                          <form >
                              <FormControl mt={6}>
                                <InputRegular type='text' placeholder='Username / Email' />
                              </FormControl>
                              <FormControl mt={6}>
                                <InputRegular type='password' placeholder='Password' />
                              </FormControl>
                             
                              <FormControl mt={3}>
                                  <Link to="/auth/register" >Create account ? </Link>
                              </FormControl>
                              <FormControl mt={6}>
                                <ButtonRegular text='Login.' />
                              </FormControl>
                              
                              
                          </form>
                      </Box>
                </Box>
            </Flex> 
          </GridItem>
      </Grid>
    </>

  );


  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg='gray.50'>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} w='lg' py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'}>Sign in to your account </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg='white'
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            {
              error ? 
              <ErrorMessage message={error} /> : null
            }
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="text" id="identifier" onChange={(e) => handleForm(e)} disabled={loading} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" id="password" onChange={(e) => handleForm(e)} disabled={loading} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'gray.600'}>Forgot password?</Link>
              </Stack>
              <Button
              loadingText="Signing in.."
              isLoading={loading}
                bg={'gray.600'}
                color={'white'}
                _hover={{
                  bg: 'gray.900',
                }}
                onClick={() => handleUserLogin()}
                >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

