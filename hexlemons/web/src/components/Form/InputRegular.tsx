import styled  from 'styled-components';
import React from 'react';

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {

}

export const InputRegular : React.FC<Props> = (props) => {

    return(
        <Input type='' {...props as any} />
    );

}


export const Input = styled.input`
    width: 100%;
    padding: 11px;
    border-radius: 5px;
    background: #d8d6d6;
    font-size: 16px;
    font-weight: 800;
    transition: .3s;

    &:hover, &:focus  {
        background: #cac8c8;
        transition: .3s;
        outline: none;
    }
`;