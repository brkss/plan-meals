import React from 'react';
import { TopModuleNavigation } from '../../../components/Navs/TopModuleNavigation';
import { MODULE_NAVS } from '../../../helpers/constants/modules_navs';
import { Box, Text } from '@chakra-ui/react';
import { ButtonRegular } from '../../../components/Form/ButtonRegular';


export const CreateBowl : React.FC = () => {

    

    return(
        <Box>
            <TopModuleNavigation id='CREATE_BOWL' links={MODULE_NAVS.bowl} />
            <Box textAlign='right'>
                
            </Box>
            <Text fontSize='25px' fontWeight='900' textTransform='uppercase' color='#383737'>
                Start With A Base ?
                <ButtonRegular text="CREATE ELEMENTS ?" style={{width: 'auto', fontSize: '14px', padding: '8px 20px', marginTop: '12px', float: 'right'}} />
            </Text>
            
        </Box>
    );  
}