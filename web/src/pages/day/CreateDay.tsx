import { Box, Heading, FormControl } from '@chakra-ui/react';
import React from 'react';
import { InputFonted } from '../../components/Form/InputFonted';

export const CreateDay : React.FC = () => {


    return(
        <Box mt={5}>
            <Heading>Create Day</Heading>
            <form >
                <FormControl>
                    <InputFonted type='text' id="title" onChange={() => {}} placeholder="Title exp. Monday"  />
                </FormControl>
                <FormControl>
                    <InputFonted type='datetime' id="title" onChange={() => {}} placeholder="Title exp. Monday"  />
                </FormControl>
            </form>
        </Box>
    )
}