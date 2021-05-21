import React from 'react'
import { RouteComponentProps } from 'react-router';
import {Box, Heading} from '@chakra-ui/react';
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';

export const InfoRecipe : React.FC<RouteComponentProps<any>> = ({match}) => {

    const [loading, SetLoading] = React.useState(false);
    const [error, SetError] = React.useState<any>();
    const [recipe, SetRecipe] = React.useState<any>();


    React.useEffect(() => {
        SetLoading(true);
        axios.post(URLS.recipe.info, {recipe_id: match.params.id}).then(resp => {
            SetLoading(false);
            const _data = resp.data;
            if(_data.status === false){
                SetError(_data.message);
                return;
            }else if(_data.status === true){
                SetRecipe(_data.data[0]);
            }
            console.log('response => ', _data);
        });
    }, []);

    if(loading || !recipe) return <>Loading</>

    return(
        <Box mt={7}>
            <Heading> {recipe.title} </Heading>
        </Box>
    );
}