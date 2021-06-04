import React from 'react';
import { Heading, Box, CloseButton, Text, Button } from '@chakra-ui/react';
import { Input } from '../Form/InputFonted';
import { AddIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { ErrorMessage } from '../ErrorMessage';


interface Props {
    loading: boolean,
    next: (key: string, _data: any) => void,
    back: () => void,
}

export const Urls : React.FC<Props> = ({next, back, loading}) => {

    const [error, SetError] = React.useState('');
    const [indexKey, SetIndexKey] = React.useState(1);
    const [urls, SetUrls] = React.useState<any []>([
        {
            id: `u-${indexKey}`,
            title: '',
            link: ''
        }
    ]) 


    // handle adding url section
    const handleAddingUrl = () => {
        SetUrls([
            ...urls,
            {
                id: `u-${indexKey + 1}`,
                link: ''
            }
        ])
        SetIndexKey(indexKey+1);
    }

    // remove url section 
    const handleRemoveUrl = (id: string) => {
        const urlIndex = urls.findIndex(x => x.id === id);
        if(urlIndex === -1) return ;
        urls.splice(urlIndex, 1);
        SetUrls([
            ...urls
        ]);
    }

    // handle url entry data
    const handleURlEntryData = (e: React.FormEvent<HTMLInputElement>, id: string) => {
        const urlIndex = urls.findIndex(x => x.id === id);
        if(urlIndex === -1) return ;
        urls[urlIndex].link =  e.currentTarget.value;
        SetUrls([
            ...urls
        ]);
    }

    // handle Urls data validation 
    const handleUrlDataValidation = () => {
        for(let i = 0; i < urls.length; i++){
            if(!urls[i].link){
                SetError('Some url data is missing!');
                return;
            }
        }
        SetError('');
        next('urls', urls);
    }

    return(
        <>
            <Heading>Urls? </Heading>
            {
                error ? 
                    <ErrorMessage message={error} /> :
                null
            }
            {
                urls.map((url, key) => (
                    <Box key={key} w='full' bg='white' border='1px solid #f5f5f5' p={5} rounded={6} mt={7}>
                        <Box d='block'>
                            <Text fontWeight='bold' color='#676666' d='inline-block'>URl {key + 1}</Text>
                            <CloseButton disabled={loading} float='right' onClick={() => handleRemoveUrl(url.id)} />
                        </Box>
                        <Box w='full' d='block' mt='5px'>
                            <Input type='text' disabled={loading} placeholder='Past your link here' id={`title-${url.id}`} value={url.link} style={{fontSize: '20px'}} onChange={(e) => handleURlEntryData(e, url.id)} />
                            {/* <Input type='text' placeholder='link?' id={`link-${url.id}`} style={{fontSize: '20px'}} /> */}
                            
                        </Box>
                    </Box>

                ))
            }
            
            <Button  disabled={loading} rightIcon={<AddIcon />} mt={7} w='full' onClick={() => handleAddingUrl()} fontSize={14} colorScheme="teal" variant="outline" >
                    ADD
            </Button>
            <Button disabled={loading} leftIcon={<ArrowBackIcon />} mt={7} mr={4} colorScheme="teal" variant="outline" onClick={() => back()}>
                    Back
            </Button>
            <Button disabled={loading} loadingText='Creating..' isLoading={loading} rightIcon={<AddIcon />} mt={7} colorScheme="teal" variant="outline"  onClick={() => handleUrlDataValidation()}>
                    Create
            </Button>
        </>
    );
}