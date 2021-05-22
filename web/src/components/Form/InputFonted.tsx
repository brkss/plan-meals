import React from 'react';
import styled from 'styled-components';
import { Box } from '@chakra-ui/react';

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    type: string;
    placeholder: string; 
    id: string;
    onChange: (e: React.FormEvent) => void,
    style?: React.CSSProperties | undefined,
    disabled?: boolean 
}

export const InputFonted : React.FC<Props> = (props) => {


    return(
        <Box mt={5}>
        {
            props.type === 'textarea' ? 
            <TextArea placeholder={props.placeholder} rows={3} id={props.id} disabled={props.disabled}  onChange={(e) => props.onChange(e)} style={props.style} /> : 
            <Input type={props.type} placeholder={props.placeholder} id={props.id} disabled={props.disabled} onChange={(e) => props.onChange(e)} style={props.style} />
        }
            
        </Box>
    );
}

export const Input = styled.input`
    background: none;
    border: none;
    font-family: 'Playfair Display', serif;
    font-weight: bold;
    font-size: 30px;
    width: 100%;
`;

export const TextArea = styled.textarea`
    background: none;
    border: none;
    font-family: 'Playfair Display', serif;
    font-weight: bold;
    font-size: 20px;
    resize: none;
    width: 100%;
    color: #5f5e5e;
`;