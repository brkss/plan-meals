import { Box, Heading, Grid, GridItem, Center, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { DayMeals } from '../../components/Day/Meals';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Next30Days } from '../../helpers/fns/dates.fn';
import { IDayDate } from '../../helpers/types/IDayDate';

export const ListDay : React.FC = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [date, SetDate] = React.useState<IDayDate>();
    const [loading, SetLoading] = React.useState(false);
    const [error, SetError] = React.useState('');
    const [form, SetForm] = React.useState<any>();
    
   

    const days = Next30Days();

    return(
        <Box mt={5}>
            <Heading>Days</Heading>
            {
                error ? 
                <ErrorMessage message={error} /> : null
            }
            
            <DayMeals day={date!} isOpenMeal={isOpen} onCloseMeal={onClose} />
            <Box>
                
                <Grid  templateColumns="repeat(48, 1fr)" gap={0}>
                   
                    {
                        days.map((day: any, key: number) => (
                            <GridItem key={key} colSpan={{lg: 6, md: 12, base: 16}}  >
                                <Box m={3}>
                                    <Center cursor='pointer' rounded={6} fontWeight='bold' height='100px' bg='gray.100' border={key === 0 ? '2px solid black' : ''} onClick={() => {
                                        SetDate(day)
                                        onOpen();
                                    }}>
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