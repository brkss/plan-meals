import React from 'react';
import styled from 'styled-components';
import { ISingleNavItem } from '../../helpers/types/ModuleNav';
import { Link } from 'react-router-dom';

interface Props {
    links: ISingleNavItem[],
    id: string
}

export const TopModuleNavigation : React.FC<Props> = ({links, id}) => {

    return (
        <div>
            <UnorderedList>
                {
                    links.map((link, key) => ( 
                            <ListItem key={key}>
                                <Link className={id === link.id ? 'link-item active' : 'link-item'} to={link.path}>{link.name}</Link>
                            </ListItem>  
                    ))
                }
            </UnorderedList>
            
        </div>
    );
}

const UnorderedList = styled.ul`
    margin: 0;
    padding: 0;
`;
const ListItem = styled.li`
    display: inline-block;
    padding: 4px 4px 4px 0px;
    margin: 0 12px 0 0px;
    font-size: 25px;
    font-weight: 800;
    text-transform: uppercase;
    & > .link-item {
        color: #383737;
        transition: .2s;
    }
    & > .link-item:hover {
        background: #D1FAF9;
        transition: .2s;
    }

    & > .active {
        background: #D1FAF9;
        text-decoration: line-through;
    }
`;

