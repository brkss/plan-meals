import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import {CreateGrocery } from './CreateGrocery';
import { ListGrocery } from './ListGrocery';

export const Grocery : React.FC = () => {

 
    const [currentTab, SetCurrentTab] = React.useState('list');
    const handleSwitchingTabs = (tab: string) => {
        SetCurrentTab(tab);
    }

    return(
        <>
            <Tabs variant="soft-rounded" colorScheme='blackAlpha'>
                <TabList>
                    <Tab bg="gray.100" mr={2} onClick={() => handleSwitchingTabs('list')}>My Groceries </Tab>
                    <Tab bg="gray.100" mr={2} onClick={() => handleSwitchingTabs('create')}>Create Grocery </Tab>
                    <Tab bg="gray.100" mr={2} >Most Needed Groceries</Tab>
                    <Tab bg="gray.100" mr={2}>Inventory ⌛️</Tab>
                </TabList>

                <TabPanels>
                    <ListGrocery />
                    {/* <TabPanel>
                        { currentTab ==='list' ? <ListGrocery /> : null }
                    </TabPanel>
                    <TabPanel>
                        { currentTab ==='create' ? <CreateGrocery /> : null }
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>Four!</p>
                    </TabPanel> */}
                </TabPanels>
            </Tabs>
        </>
    );
}