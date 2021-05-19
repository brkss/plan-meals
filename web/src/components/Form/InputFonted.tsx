import React from 'react';
import styled from 'styled-components';
import { Box } from '@chakra-ui/react';

interface Props {
    type: string;
    placeholder: string; 
    id: string;
    onChange: (e: React.FormEvent) => void
}

export const InputFonted : React.FC<Props> = (props) => {


    return(
        <Box mt={5}>
        {
            props.type === 'textarea' ? 
            <TextArea placeholder={props.placeholder} rows={3} id={props.id} onChange={(e ) => props.onChange(e)} /> : 
            <Input type={props.type} placeholder={props.placeholder} id={props.id} onChange={(e) => props.onChange(e)} />
        }
            
        </Box>
    );
}

const Input = styled.input`
    background: none;
    border: none;
    font-family: 'Playfair Display', serif;
    font-weight: bold;
    font-size: 30px;
    width: 100%;
`;

const TextArea = styled.textarea`
    background: none;
    border: none;
    font-family: 'Playfair Display', serif;
    font-weight: bold;
    font-size: 20px;
    resize: none;
    width: 100%;
    color: #5f5e5e;
`;