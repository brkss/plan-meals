import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import {CreateGrocery } from './CreateGrocery';
import { ListGrocery } from './ListGrocery';

export const Grocery : React.FC = () => {

 
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
                        <ListGrocery />
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