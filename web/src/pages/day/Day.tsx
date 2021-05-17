import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import React from 'react';


export const Day : React.FC = () => {


    return(
        <>
            <Tabs variant="soft-rounded" colorScheme="blackAlpha">
                <TabList>
                    <Tab bg="gray.100" mr={2}>Days </Tab>
                    <Tab bg="gray.100" mr={2}>Add Day </Tab>
                    <Tab bg="gray.100" mr={2}>Meals </Tab>
                    <Tab bg="gray.100" mr={2}>Calendar ⌛️</Tab>
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
                    <TabPanel>
                        <p>Four!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
}