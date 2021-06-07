import { Center, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, FormControl, Box, Select } from '@chakra-ui/react';
import React from 'react';
import { useBowlElementCategoriesQuery, useCreateBowlElementMutation } from '../../generated/graphql';
import { imageToBase64 } from '../../helpers/utils/createBase64';
import { ErrorMessage } from '../ErrorMessage';
import { ButtonRegular } from '../Form/ButtonRegular';
import { InputRegular } from '../Form/InputRegular';


interface Props {
    isOpen : boolean
    onOpen: () => void,
    onClose: () => void
}

export const CreateElement : React.FC<Props> = ({onOpen, onClose, isOpen}) => {

    const [createBowlElement] = useCreateBowlElementMutation();
    const {loading, data} = useBowlElementCategoriesQuery();
    const [form, SetForm] = React.useState<any>();
    const [image, SetImage] = React.useState<File>();
    const [src, SetSrc] = React.useState<any>();
    const [error, SetError] = React.useState<string>();

    // handle image uploading
    const handleImageInput = (e: React.FormEvent<HTMLInputElement>) => {
        const image : File = e.currentTarget.files![0];
        if(!image.type.includes('image/')){
            SetError('Not valid Image !');
            return;
        }
        SetError('');
        SetImage(image);
        const url = URL.createObjectURL(image);
        SetSrc(url);
    }

    //handle form 
    const handleForm = (e: React.FormEvent<any>) => {
        console.log('data => ', {[e.currentTarget.id]: e.currentTarget.value});
        SetForm({
            ...form,
            [e.currentTarget.id]: e.currentTarget.value
        })
    }

    // choose file 
    const chooseFile = () => {
        console.log('choose file')
        const file = document.getElementById('image');
        file?.click();
    }


    // handle item creation
    const handleItemCreation = () => {
        

        // validate form
        if(!form || !form.title || !form.calories || !image || !form.category){
            SetError('Invalid Data !');
            return;
        }
        const _data = {
            title: form.title,
            calories: form.calories,
            category: form.category,
            image: image
        };
        console.log('_data => ', _data);
        SetError('');

        createBowlElement({
             variables :{
                calories: _data.calories,
                title: _data.title,
                category: _data.category,
                image: image 
            }
        }).then((res) => {
            console.log('create bowl element response => ', res);
            if(res.data?.createBowlElement.status === true){
                onClose();
            }
        });
    }

    if(loading) return (<Center>Loading</Center>);

    return (
        <>
        
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            size='md'
            >
            <DrawerOverlay />
            <DrawerContent bg="#F4F3E7">
            <DrawerCloseButton />
            <DrawerHeader fontWeight='800'>Create new element. </DrawerHeader>

            <DrawerBody>
                {
                    error ? 
                    <Box mb={5}>
                        <ErrorMessage message={error} />
                    </Box>
                     : null
                }
                {
                    src ?
                    <img src={src} onClick={() => chooseFile()} style={{borderRadius: '6px', cursor: 'pointer', margin: 'auto'}} /> : 
                    <Center height={200} onClick={() => chooseFile()} border="3px dashed #00000099" cursor='pointer' rounded={5} fontWeight='600'>
                        ADD IMAGE?
                    </Center> 
                }
               
                <input type="file" name="" id='image' style={{opacity: 0}} onChange={(e) => handleImageInput(e)} />
                <FormControl mt={5}>
                    <InputRegular type='text' placeholder='Title' id='title' onChange={(e) => handleForm(e)} />
                </FormControl>
                <FormControl mt={5}>
                    <InputRegular type='number' placeholder='Calories' id='calories' onChange={(e) => handleForm(e)} />
                </FormControl>
                <FormControl mt={5}>
                    <Select placeholder="Category" fontWeight='800' bg='#d8d6d6' id='category' onChange={(e) => handleForm(e)}>
                        {
                            data?.bowlElementCategories.map((category, key) => (
                                <option value={category.id}>{category.title}</option>
                            ))
                        }
                        
                    </Select>
                </FormControl>
                <FormControl mt={5}>
                    <ButtonRegular text='ADD ELEMENT.' onClick={() => handleItemCreation()} />
                </FormControl>
               
            </DrawerBody>

            
            </DrawerContent>
        </Drawer>
        </>
    )
}