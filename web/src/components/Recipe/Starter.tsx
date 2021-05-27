import { AddIcon, ArrowForwardIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { FormControl, FormLabel, Button, useDisclosure, ModalBody, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Link } from '@chakra-ui/react';
import React from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { InputFonted } from '../Form/InputFonted';
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';
import { useHistory } from 'react-router';
import { supported } from '../../helpers/data/supported_websites'

interface Props {
    next: () => void;
}

export const Starter : React.FC<Props> = ({next}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef()

    const history = useHistory();
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
        const _data = resp.data;
        if(_data.status === false){
            SetError(_data.message)
        }else {
            history.push('/dash/recipe/list')
        }

    }
    

    return(
        
        <>
            {
                error ? 
                <ErrorMessage message={error} /> : null
            }
            <form >
                
                <InputFonted type='text' placeholder='URL' id='title' onChange={(e) => handleUrlInsertion(e)} disabled={loading}  />
                <hr style={{marginTop: '12px', marginBottom: '4px'}} />
                <FormLabel htmlFor="public-recipe" d='block'  mt={4} >
                    Too many recipes are available online past url and we will clone it.
                    <Button mt={2} onClick={onOpen}>Where to find recipes?</Button>
                </FormLabel>
                <hr style={{marginTop: '12px', marginBottom: '4px'}} />
               
                <FormControl mt={3}>
                    {
                        url ?
                        <Button  rightIcon={<AddIcon />} colorScheme="teal" variant="outline" onClick={() => handleCreationFromUrl()} loadingText='Cloning..' isLoading={loading} >
                            Clone this recipe
                        </Button> : 
                        <>
                             <FormControl display="flex" alignItems="center" mt={6}>
                                <FormLabel  htmlFor="public-recipe" mb="0">
                                    Manual insert is for your special recipe
                                </FormLabel>
                            </FormControl>
                            <Button  rightIcon={<ArrowForwardIcon />} onClick={() => next()} colorScheme="teal" variant="outline">
                                Create Recipe Manualy
                            </Button>
                        </>
                        
                    }
                   
                </FormControl>
            </form>

            <Modal  isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontWeight='bold'>Best website to find recipes</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        
                        {
                            supported.map((url, key) => (
                                <Link key={key} href={url} isExternal d='block' mb={2}>
                                   {url} <ExternalLinkIcon mx="2px" />
                                </Link>
                            ))
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}