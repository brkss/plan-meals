import React from 'react';
import styled from 'styled-components';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    text: string;
}

export const ButtonAddElement : React.FC<Props> = (props) => {

    const text  = props.text;
    return(
        <Button {...props as any}> {text} </Button>
    );
}

const Button = styled.button`
    background: #d1faf8;
    font-size: 13px;
    margin-left: 12px;
    font-weight: 800;
    margin-top: -6px;
    display: inline;

    &:focus {
        outline: none;
        border: 1px dotted black;
    }
`;