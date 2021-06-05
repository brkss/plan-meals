import React from 'react';
import { TopModuleNavigation } from '../../../components/Navs/TopModuleNavigation';
import { MODULE_NAVS } from '../../../helpers/constants/modules_navs';
import { Box } from '@chakra-ui/react';


export const Bowls : React.FC = () => {

    

    return(
        <Box>
            <TopModuleNavigation id='MY_BOWLS' links={MODULE_NAVS.bowl} />
        </Box>
    );  
}