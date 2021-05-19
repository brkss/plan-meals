import React from 'react';
import styled from 'styled-components';


interface Props {
    type: string;
    placeholder: string; 
}

export const InputFonted : React.FC<Props> = (props) => {


    return(
        <>
            <Input type={props.type} placeholder={props.placeholder} />
        </>
    );
}

const Input = styled.input`
    background: none;
    border: none;
    font-family: 'Playfair Display', serif;
    font-weight: bold;
    font-size: 30px;
`;