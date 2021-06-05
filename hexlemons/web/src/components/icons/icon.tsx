import React from 'react';
import styled from 'styled-components';

interface Props {
    icon: string;
}

export const IconCupr : React.FC<Props> = ({icon}) => {

    return(
        <Icon dangerouslySetInnerHTML={{__html: icon}}></Icon>
    );

}


const Icon = styled.span`

`;


