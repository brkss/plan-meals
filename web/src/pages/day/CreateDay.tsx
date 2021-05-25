import { Box, Heading, FormControl, Button, Grid, GridItem, Center } from '@chakra-ui/react';
import React from 'react';
import { ErrorMessage } from '../../components/ErrorMessage';


export const CreateDay : React.FC = () => {

    const [loading, SetLoading] = React.useState(false);
    const [error, SetError] = React.useState('');
    const [form, SetForm] = React.useState<any>();
    
    // 
    const handleForm = (e: React.FormEvent<any>) => {
        SetForm({
            ...form,
            [e.currentTarget.id]: e.currentTarget.value
        })
    }

    //
    const handleDayCreation = () => {
        if(!form || !form.title || !form.date){
            SetError('Please check your data!');
            return;
        }
        SetError('');
    }


    return(
        <Box mt={5}>
            <Heading>Days</Heading>
            {
                error ? 
                <ErrorMessage message={error} /> : null
            }
            {/* <form >
                <FormControl>
                    <InputFonted type='text' id="title" onChange={(e) => handleForm(e)} placeholder="Title exp. Monday"  />
                </FormControl>
                <FormControl>
                    <InputFonted type='date' id="date" onChange={(e) => handleForm(e)} placeholder="Title exp. Monday"  />
                </FormControl>
                <FormControl>
                <Button colorScheme="teal" variant="outline" onClick={() => handleDayCreation()} >
                    Create
                </Button>
                </FormControl>
            </form> */}
            <Box>
                <Grid  templateColumns="repeat(18, 1fr)" gap={0}>
                    <GridItem colSpan={{md: 6, base: 3}}  >
                        <Box m={5}>
                            <Center rounded={6} fontWeight='bold' height='100px' bg='gray.300'>
                                Day 1
                            </Center>
                        </Box>
                    </GridItem>
                    <GridItem colSpan={{md: 6, base: 3}}  >
                        <Box m={5}>
                            <Center rounded={6} fontWeight='bold' height='100px' bg='gray.300'>
                                Day 1
                            </Center>
                        </Box>
                    </GridItem>
                    <GridItem colSpan={{md: 6, base: 3}}  >
                        <Box m={5}>
                            <Center rounded={6} fontWeight='bold' height='100px' bg='gray.300'>
                                Day 1
                            </Center>
                        </Box>
                    </GridItem>
                    <GridItem colSpan={{md: 6, base: 3}}  >
                        <Box m={5}>
                            <Center rounded={6} fontWeight='bold' height='100px' bg='gray.300'>
                                Day 1
                            </Center>
                        </Box>
                    </GridItem>
                    <GridItem colSpan={{md: 6, base: 3}}  >
                        <Box m={5}>
                            <Center rounded={6} fontWeight='bold' height='100px' bg='gray.300'>
                                Day 1
                            </Center>
                        </Box>
                    </GridItem>
                    <GridItem colSpan={{md: 6, base: 3}}  >
                        <Box m={5}>
                            <Center rounded={6} fontWeight='bold' height='100px' bg='gray.300'>
                                Day 1
                            </Center>
                        </Box>
                    </GridItem>
                    
                    
                    
                </Grid>
            </Box>
        </Box>
    )
}