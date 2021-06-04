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
import React from 'react';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useRegisterMutation } from '../../generated/graphql';
import { getAccessToken, SetAccessToken } from '../../helpers/constants/token';
import { DEFAULT_REDIR_AUTH } from '../../helpers/constants/defaults';

export const RegisterPage : React.FC<RouteComponentProps> = ({history}) => {


  const [form, SetForm] = React.useState<any>();
  const [error, SetError] = React.useState('');
  const [loading, SetLoading] = React.useState(false);
  const [register] = useRegisterMutation();

  if(getAccessToken() !== ''){
    history.push(DEFAULT_REDIR_AUTH);
  }

  const handleForm = (e: React.FormEvent<HTMLInputElement>) => { 
      SetForm({
          ...form,
          [e.currentTarget.id] : e.currentTarget.value
      });
  }

  const handleCreateAccount = async () => {

      SetError('')

      // validate
      if(!form || !form.name || !form.email || !form.phone || !form.password ){
          SetError('Invalid data');
          return ;
      }
      SetError('');
      const _data = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password
      }
      console.log('data => ', _data);
      SetLoading(true);
      const res = await register({
        variables: {
          name: _data.name,
          email: _data.email,
          password: _data.password,
          phone: _data.phone
        },
      });
      
      console.log("register response -> ", res);
      SetLoading(false);
      if(res.data?.register.status === true){
        console.log('registered successfuly');
        SetAccessToken(res.data.register.accessToken!);
        history.push('/');
      }else if(res.data?.register.status === false){
        console.log("error status is false")
        SetError(res.data!.register.message!);
      }

  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg='gray.50'>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} w='lg' py={12} px={6}>
        <Stack align={'center'}>
          <Heading   fontSize={'3xl'}>Sign up for a new account </Heading>
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
              <FormLabel>Name :</FormLabel>
              <Input type="text" placeholder='Example example' id="name" onChange={(e) => handleForm(e)} disabled={loading} />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Phone :</FormLabel>
              <Input type="text" placeholder='0000000000' id="phone" onChange={(e) => handleForm(e)} disabled={loading} />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder='example@exapmle.com' id="email" onChange={(e) => handleForm(e)} disabled={loading} />
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
                <Link color={'gray.600'}>Login to your account?</Link>
              </Stack>
              <Button
                bg={'gray.600'}
                color={'white'}
                _hover={{
                  bg: 'gray.900',
                }}
                loadingText="signing up..."
                isLoading={loading}
                onClick={() => handleCreateAccount()}
                >
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}