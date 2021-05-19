import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { IRoute } from '../../helpers/types/IRoute';
import { Route, RouteComponentProps } from 'react-router-dom';
import { GruardRoute } from '../../components/GuardRoute';
import { ModuleNavigation } from '../../components/ModuleNavigation';

interface Props {
    children: IRoute[],
}

export const Grocery : React.FC<Props> = ({children}) => {

 
    const [currentTab, SetCurrentTab] = React.useState('list');
    const handleSwitchingTabs = (tab: string) => {
        SetCurrentTab(tab);
    
    }

    console.log('childrens => ', children);
    return(
        <> 
            <ModuleNavigation />
                {
                    children.map((route, key) => (
                        route.protected ? 
                        <GruardRoute key={key} route={route} /> : 
                        <Route  key={key} exact={route.exact} path={`${route.path}`} render={(props: RouteComponentProps) => (
                            <route.component {...props} {...route.props} name={route.name}  />
                        )} />
                    ))
                }
            {/* <Tabs variant="soft-rounded" colorScheme='blackAlpha'>
                <TabList>
                    <Tab bg="gray.100" mr={2} onClick={() => handleSwitchingTabs('list')}>My Groceries </Tab>
                    <Tab bg="gray.100" mr={2} onClick={() => handleSwitchingTabs('create')}>Create Grocery </Tab>
                    <Tab bg="gray.100" mr={2} >Most Needed Groceries</Tab>
                    <Tab bg="gray.100" mr={2}>Inventory ⌛️</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
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
                    </TabPanel>
                </TabPanels>
            </Tabs> */}

            
        </>
    );
}