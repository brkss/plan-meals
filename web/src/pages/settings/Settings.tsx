import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import React from 'react';


export const Settings : React.FC = () => {


    return(
        <>
            <Tabs variant="soft-rounded" colorScheme="blackAlpha">
                <TabList>
                    <Tab bg="gray.100" mr={2}>Profile </Tab>
                    <Tab bg="gray.100" mr={2}>General </Tab>
                    <Tab bg="gray.100" mr={2}>Privacy ⌛️</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                    
                </TabPanels>
            </Tabs>
        </>
    );
}