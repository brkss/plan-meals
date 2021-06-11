import React from 'react';
import { TopModuleNavigation } from '../../../components/Navs/TopModuleNavigation';
import { MODULE_NAVS } from '../../../helpers/constants/modules_navs';
import { Box, Grid, GridItem, Text, useDisclosure, Center } from '@chakra-ui/react';
import { ButtonAddElement } from '../../../components/Form/ButtonAddElement';
import { BowlElement } from '../../../components/Bowl/Element';
import { InputRegular } from '../../../components/Form/InputRegular';
import { CreateElement } from '../../../components/Bowl/CreateElement';
import { useBowlElementCategoriesQuery, useBowlElementsWithCategoryQuery } from '../../../generated/graphql';

export const CreateBowl : React.FC = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const elements = useBowlElementsWithCategoryQuery(); 
    const categories = useBowlElementCategoriesQuery();
    const [mappedElements, SetMappedElements] = React.useState<any[]>([]);

    React.useEffect(() => {
        // map element in categories 
        elements.data?.bowlElementWithCateogry.map((element, key) => {
            const index = mappedElements.findIndex(x => x.id === element.category.id);
            if(index === -1){
                // element not found 
                mappedElements.push({
                    ...element.category,
                    elements: [
                        element
                    ]
                });
            }else {
                // element found
                mappedElements[index].elements.push(element);
            }
            SetMappedElements(mappedElements);
        });
        
    }, [mappedElements]);
    
    
    

    

    if(elements.loading || categories.loading){
        return <Center height='100vh'>Loading</Center>
    }

    

    return(
        <Box>
            <TopModuleNavigation id='CREATE_BOWL' links={MODULE_NAVS.bowl} />
            <Box textAlign='right'>
                
            </Box>
            
            {
                categories.data?.bowlElementCategories.map((category, key) => (
                    <Box key={key}>
                        <Text fontSize='25px' fontWeight='900' textTransform='uppercase' color='#383737'>
                            {category.description} 
                            <ButtonAddElement text="CLICK HERE TO CREATE ELEMENTS ?" onClick={() => onOpen()} />
                        </Text>
                        <Box>
                            <Grid  templateColumns="repeat(21, 1fr)" gap={5} pt={5} mt={4}>
                                    {
                                        elements.data?.bowlElementWithCateogry.map((element, key) => (
                                            element.category.id === category.id ? 
                                                <GridItem key={key} colSpan={{md: 3, base: 7}}>
                                                    <BowlElement title={element.title} calories={element.calories} image={element.image} />
                                                </GridItem>
                                            : null
                                        ))
                                    }
                            </Grid>
                        </Box>
                    </Box>
                ))
            }
            
            
            <CreateElement isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        </Box>
    );  
}