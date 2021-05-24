import { Box, Heading, FormControl, Button } from '@chakra-ui/react';
import React from 'react';
import { InputFonted } from '../../components/Form/InputFonted';

export const CreateDay : React.FC = () => {

    const [loading, SetLoading] = React.useState(false);
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
        
    }


    return(
        <Box mt={5}>
            <Heading>Days</Heading>
            <form >
                <FormControl>
                    <InputFonted type='text' id="title" onChange={(e) => handleForm(e)} placeholder="Title exp. Monday"  />
                </FormControl>
                <FormControl>
                    <InputFonted type='date' id="date" onChange={(e) => handleForm(e)} placeholder="Title exp. Monday"  />
                </FormControl>
                <FormControl>
                <Button colorScheme="teal" variant="outline">
                    Create
                </Button>
                </FormControl>
            </form>
        </Box>
    )
}