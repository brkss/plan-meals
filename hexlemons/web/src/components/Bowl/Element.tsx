import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export const BowlElement : React.FC = () => {

    return(
        <Box bg='#FBE6C1' borderRadius={8} p={4}>
            <img src="https://res.cloudinary.com/sweetgreen/image/fetch/c_scale,w_250/f_auto,q_auto:good/https://res.cloudinary.com/sweetgreen/image/upload/v1621981044/gravy/production/Gravy::Ingredient/2021_02_23_apples_sliced_three_quarter_digital_evergreen_0836_V1_eattnp.png" alt="" />
            <Box>
                <Text fontWeight='800'>Apple</Text>
                <Text fontWeight='400' fontSize={14} opacity={.8}>98cal</Text>
            </Box>
        </Box>
    );
}