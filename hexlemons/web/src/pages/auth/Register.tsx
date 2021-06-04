
import { Flex, Box, FormControl, Link, Heading, Grid, GridItem } from '@chakra-ui/react';

import React from 'react';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useRegisterMutation } from '../../generated/graphql';
import { getAccessToken, SetAccessToken } from '../../helpers/constants/token';
import { DEFAULT_REDIR_AUTH } from '../../helpers/constants/defaults';
import { InputRegular } from '../../components/Form/InputRegular';
import { ButtonRegular } from '../../components/Form/ButtonRegular';

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

  const handleCreateAccount = async (e: React.FormEvent) => {
      e.preventDefault();
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


  return(
    <>
      <Grid templateColumns="repeat(12, 1fr)" height='100vh' >
          <GridItem colSpan={1} bg="#ACCDC5" borderRight='1px solid #0000002b'>
            
          </GridItem>
          <GridItem colSpan={11} bg="#F4F3E7" >
            <Flex w='full' align='center' justifyContent='center'>
                  <Box p={12} w='100%' maxW='475px' rounded={6}>
                        <Box textAlign='left'> 
                            <Heading>Create Account.</Heading>
                        </Box>
                        {error !== '' ? <ErrorMessage message={error} /> : null}
                        <Box my={4} textAlign='left'>
                            <form onSubmit={(e) => handleCreateAccount(e)}>
                                <FormControl mt={6}>
                                  <InputRegular type='text' placeholder='Full Name.' id="name" onChange={(e) => handleForm(e)} disabled={loading} />
                                </FormControl>
                                <FormControl mt={6}>
                                  <InputRegular type="text" placeholder='Username.' id="phone" onChange={(e) => handleForm(e)} disabled={loading} />
                                </FormControl>
                                <FormControl mt={6}>
                                  <InputRegular type="email" placeholder='Email.' id="email" onChange={(e) => handleForm(e)} disabled={loading}/>
                                </FormControl>
                                <FormControl mt={6}>
                                  <InputRegular type="password" placeholder='Password.' id="password" onChange={(e) => handleForm(e)} disabled={loading}/>
                                </FormControl>
                              
                                <FormControl mt={3}>
                                    <Link to="/auth/register" >Create account ? </Link>
                                </FormControl>
                                <FormControl mt={6}>
                                  <ButtonRegular text='Create Account.' />
                                </FormControl>
                                
                                
                            </form>
                        </Box>
                  </Box>
              </Flex> 
          </GridItem>
      </Grid>
    </>

  );

  
}