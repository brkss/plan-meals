import { AddIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { FormControl, FormLabel, Button } from '@chakra-ui/react';
import React from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { InputFonted } from '../Form/InputFonted';
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';

interface Props {
    next: () => void;
}

export const Starter : React.FC<Props> = ({next}) => {

    const [error, SetError] = React.useState('');
    const [url, SetUrl] = React.useState('');
    const [loading, SetLoading] = React.useState(false);

    const handleUrlInsertion = (e: React.FormEvent<any>) => {
        SetUrl(e.currentTarget.value)
    }

    const handleCreationFromUrl = async () => {

        if(!url || url.length < 5){
            SetError('Invalide Url');
        }
        SetLoading(true);
        const resp = await axios.post(URLS.recipe.createFromUrl, {url: url})
        console.log('create from url; response => ', resp);
        SetLoading(false);

    }
    

    return(
        <>
            {
                error ? 
                <ErrorMessage message={error} /> : null
            }
            <form >
                <FormLabel  htmlFor="public-recipe" mb="0">
                    Too many recipes are available online past url and we will clone it.
                </FormLabel>
                <InputFonted type='text' placeholder='URL' id='title' onChange={(e) => handleUrlInsertion(e)} disabled={loading}  />
                <hr style={{marginTop: '12px'}} />
                
                <FormControl display="flex" alignItems="center" mt={6}>
                    <FormLabel  htmlFor="public-recipe" mb="0">
                        Manual insert is for your special recipe
                    </FormLabel>
                </FormControl>
                <FormControl mt={6}>
                    {
                        url ?
                        <Button  rightIcon={<AddIcon />} colorScheme="teal" variant="outline" onClick={() => handleCreationFromUrl()} loadingText='Cloning..' isLoading={loading} >
                            Clone this recipe
                        </Button> : 
                        <Button  rightIcon={<ArrowForwardIcon />} onClick={() => next()} colorScheme="teal" variant="outline">
                            Create Recipe Manualy
                        </Button>
                    }
                   
                </FormControl>
            </form>
        </>
    );
}