import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, useColorMode } from '@chakra-ui/react';
import {CreateGrocery } from './CreateGrocery';

export const Grocery : React.FC = () => {

    const {colorMode} = useColorMode();
 
    return(
        <>
            <Tabs variant="soft-rounded" colorScheme='blackAlpha'>
                <TabList>
                    <Tab bg="gray.100" mr={2}>My Groceries </Tab>
                    <Tab bg="gray.100" mr={2}>Create Grocery </Tab>
                    <Tab bg="gray.100" mr={2}>Most Needed Groceries</Tab>
                    <Tab bg="gray.100" mr={2}>Inventory ⌛️</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <p>one</p>
                    </TabPanel>
                    <TabPanel>
                        <CreateGrocery />
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