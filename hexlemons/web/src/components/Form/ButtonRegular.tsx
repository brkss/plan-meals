import React from 'react';
import styled from 'styled-components';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    text: string;
}

export const ButtonRegular : React.FC<Props> = (props) => {

    const text  = props.text;
    return(
        <Button {...props as any} >{text}</Button>
    )
}

const Button = styled.button`
    width: 100%;
    padding: 7px;
    background: #007665;
    border-radius: 5px;
    font-weight: 800;
    color: white;
    transition: .3s;
    
    &:hover, &:focus {
        background: #014238;
        transition: .3s;
    }

`