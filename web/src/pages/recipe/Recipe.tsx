import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import React from 'react';


export const Recipe : React.FC = () => {


    return(
        <>
            <Tabs variant="soft-rounded" colorScheme="blackAlpha">
                <TabList>
                    <Tab bg="gray.100" mr={2} >My Recipes </Tab>
                    <Tab bg="gray.100" mr={2}>Add Recipe </Tab>
                    <Tab bg="gray.100" mr={2}>Library </Tab>
                    <Tab bg="gray.100" mr={2}>Statistiques ⌛️</Tab>
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