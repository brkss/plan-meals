import { AddIcon, ArrowForwardIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { FormControl, FormLabel, Button, useDisclosure, ModalBody, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Link } from '@chakra-ui/react';
import React from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { InputFonted } from '../Form/InputFonted';
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';
import { useHistory } from 'react-router';


const supported = [
    'https://www.101cookbooks.com/',
    'https://www.allrecipes.com/',
    'https://www.ambitiouskitchen.com/',
    'https://www.averiecooks.com/',
    'https://www.bbc.co.uk/',
    'https://www.bbcgoodfood.com/',
    'https://www.bonappetit.com/',
    'https://www.budgetbytes.com/',
    'https://www.centraltexasfoodbank.org/',
    'https://www.closetcooking.com/',
    'https://cookieandkate.com/',
    'https://copykat.com/',
    'https://damndelicious.net/',
    'https://www.eatingwell.com/',
    'https://www.epicurious.com/',
    'https://www.food.com/',
    'https://www.foodandwine.com/',
    'https://www.foodnetwork.com/',
    'https://gimmedelicious.com/',
    'https://www.gimmesomeoven.com/',
    'https://julieblanner.com/',
    'https://www.kitchenstories.com/',
    'https://www.melskitchencafe.com/',
    'https://www.minimalistbaker.com/',
    'https://www.myrecipes.com/',
    'https://www.nomnompaleo.com/',
    'https://www.omnivorescookbook.com/',
    'https://pinchofyum.com/',
    'https://recipetineats.com/',
    'https://www.seriouseats.com/',
    'https://www.simplyrecipes.com/',
    'https://smittenkitchen.com/',
    "https://thepioneerwoman.com/",
    'https://www.tasteofhome.com/',
    'https://tastesbetterfromscratch.com/',
    'https://thatlowcarblife.com/',
    'https://www.theblackpeppercorn.com/',
    'https://therealfoodrds.com/',
    'https://www.thespruceeats.com/',
    'https://whatsgabycooking.com/',
    'https://www.woolworths.com.au/',
    'https://www.yummly.com/',
    'https://www.jamieoliver.com/'
];

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
                <FormControl display="flex" alignItems="center" mt={6}>
                    <FormLabel  htmlFor="public-recipe" mb="0">
                        Manual insert is for your special recipe
                    </FormLabel>
                </FormControl>
                <FormControl mt={3}>
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