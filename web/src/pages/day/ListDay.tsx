import { Box, Heading, FormControl, Button, Grid, GridItem, Center, Text } from '@chakra-ui/react';
import React from 'react';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Next30Days } from '../../helpers/fns/dates.fn';

export const ListDay : React.FC = () => {

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

    const days = Next30Days();

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
                
                <Grid  templateColumns="repeat(48, 1fr)" gap={0}>
                   
                    {
                        days.map((day: any, key: number) => (
                            <GridItem key={key} colSpan={{lg: 6, md: 12, base: 16}}  >
                                <Box m={3}>
                                    <Center cursor='pointer' rounded={6} fontWeight='bold' height='100px' bg='gray.100' border={key === 0 ? '2px solid black' : ''}>
                                        <Text textAlign='center'>
                                            {day.date}, {day.month} 
                                            <br />
                                            <span style={{fontSize: '12px', opacity: '.8'}}>{day.name}</span>
                                        </Text>
                                        
                                    </Center>
                                </Box>
                            </GridItem>
                        ))
                    }
                    
                    
                    
                    
                    
                </Grid>
            </Box>
        </Box>
    )
}